// Efeitos sonoros gerados pelo navegador (Web Audio): não usam arquivos nem material de terceiros.
//
// Como usar:
//  - tocar('nome') em qualquer lugar do código;
//  - em um botão, basta colocar data-som="nome" para ele tocar esse som ao ser clicado.
//    Botões sem data-som tocam o som padrão "clique".

let ctx = null
let ligado = true
const VOLUME = 0.5

try {
  ligado = localStorage.getItem('ezcopo_sfx') !== 'off'
} catch {
  /* sem armazenamento: segue ligado */
}

function contexto() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Uma notinha com ataque rápido e queda suave. "fim" faz o tom deslizar (para cima ou para baixo).
function tom({ freq, fim, dur = 0.15, tipo = 'sine', ganho = 0.08, inicio = 0 }) {
  const c = contexto()
  if (!c) return
  const t = c.currentTime + inicio
  const o = c.createOscillator()
  o.type = tipo
  o.frequency.setValueAtTime(freq, t)
  if (fim) o.frequency.exponentialRampToValueAtTime(fim, t + dur)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(ganho * VOLUME * 2, t + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(c.destination)
  o.start(t)
  o.stop(t + dur + 0.05)
}

const SONS = {
  clique: () => tom({ freq: 620, fim: 430, dur: 0.06, tipo: 'triangle', ganho: 0.06 }),
  abrir: () => tom({ freq: 380, fim: 760, dur: 0.13, ganho: 0.07 }),
  fechar: () => tom({ freq: 760, fim: 380, dur: 0.11, ganho: 0.06 }),
  fixar: () => {
    tom({ freq: 700, dur: 0.09, ganho: 0.1 })
    tom({ freq: 1050, dur: 0.12, ganho: 0.09, inicio: 0.07 })
  },
  desfixar: () => tom({ freq: 520, fim: 300, dur: 0.12, tipo: 'triangle', ganho: 0.07 }),
  ding: () => {
    tom({ freq: 880, dur: 0.4, ganho: 0.09 })
    tom({ freq: 1320, dur: 0.5, ganho: 0.06, inicio: 0.08 })
  },
  email: () => {
    tom({ freq: 880, dur: 0.3, ganho: 0.08 })
    tom({ freq: 1175, dur: 0.3, ganho: 0.08, inicio: 0.14 })
    tom({ freq: 1320, dur: 0.5, ganho: 0.07, inicio: 0.28 })
  },
  sucesso: () => [523, 659, 784, 1047].forEach((f, i) => tom({ freq: f, dur: 0.32, tipo: 'triangle', ganho: 0.09, inicio: i * 0.1 })),
  regular: () => {
    tom({ freq: 392, dur: 0.25, tipo: 'triangle', ganho: 0.08 })
    tom({ freq: 523, dur: 0.38, tipo: 'triangle', ganho: 0.08, inicio: 0.15 })
  },
  erro: () => tom({ freq: 240, fim: 160, dur: 0.2, tipo: 'square', ganho: 0.04 }),
  inicio: () => [440, 660, 880].forEach((f, i) => tom({ freq: f, dur: 0.22, ganho: 0.08, inicio: i * 0.07 })),
}

export function tocar(nome) {
  if (!ligado) return
  try {
    SONS[nome]?.()
  } catch {
    /* som é enfeite: nunca pode quebrar o jogo */
  }
}

export function efeitosLigados() {
  return ligado
}

export function definirEfeitos(valor) {
  ligado = valor
  try {
    localStorage.setItem('ezcopo_sfx', valor ? 'on' : 'off')
  } catch {
    /* tudo bem */
  }
}

// Ouve todos os cliques da página e toca o som certo (data-som ou o "clique" padrão em botões)
export function instalarCliques() {
  const aoClicar = (e) => {
    const alvoSom = e.target.closest?.('[data-som]')
    if (alvoSom) tocar(alvoSom.dataset.som)
    else if (e.target.closest?.('button')) tocar('clique')
  }
  document.addEventListener('click', aoClicar, true)
  return () => document.removeEventListener('click', aoClicar, true)
}
