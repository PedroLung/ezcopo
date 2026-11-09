// Trilha ambiente gerada pelo próprio navegador (Web Audio). Não usa nenhum arquivo nem música de terceiros.
// Toca uma progressão suave (Am7, Fmaj7, Cmaj7, G6) com um colchão de sons, um baixo leve
// e notinhas aleatórias, com reverb. É o "plano B" quando não existe public/audio/musica.mp3.

const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12)

const ACORDES = [
  { raiz: 45, notas: [57, 60, 64, 67] }, // Am7
  { raiz: 41, notas: [53, 57, 60, 64] }, // Fmaj7
  { raiz: 48, notas: [60, 64, 67, 71] }, // Cmaj7
  { raiz: 43, notas: [55, 59, 62, 64] }, // G6
]
const DURACAO = 5 // segundos por acorde

// Reverb sintético: ruído que vai sumindo
function criarImpulso(ctx, segundos) {
  const tamanho = Math.floor(ctx.sampleRate * segundos)
  const buffer = ctx.createBuffer(2, tamanho, ctx.sampleRate)
  for (let c = 0; c < 2; c++) {
    const dados = buffer.getChannelData(c)
    for (let i = 0; i < tamanho; i++) dados[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / tamanho, 2.4)
  }
  return buffer
}

export function criarGerador() {
  let ctx = null
  let master = null
  let barramento = null
  let temporizador = null
  let suspender = null
  let proximo = 0
  let indice = 0
  let volume = 0.4

  function montar() {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    master = ctx.createGain()
    master.gain.value = 0

    const filtro = ctx.createBiquadFilter()
    filtro.type = 'lowpass'
    filtro.frequency.value = 1700

    const reverb = ctx.createConvolver()
    reverb.buffer = criarImpulso(ctx, 3.4)
    const molhado = ctx.createGain()
    molhado.gain.value = 0.6
    const seco = ctx.createGain()
    seco.gain.value = 0.7

    barramento = ctx.createGain()
    barramento.connect(seco).connect(filtro)
    barramento.connect(reverb).connect(molhado).connect(filtro)
    filtro.connect(master).connect(ctx.destination)
  }

  function nota(f, inicio, duracao, tipo, ganho, ataque, soltura) {
    const o = ctx.createOscillator()
    o.type = tipo
    o.frequency.value = f
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, inicio)
    g.gain.linearRampToValueAtTime(ganho, inicio + ataque)
    g.gain.setValueAtTime(ganho, inicio + Math.max(ataque, duracao - soltura))
    g.gain.linearRampToValueAtTime(0, inicio + duracao)
    o.connect(g).connect(barramento)
    o.start(inicio)
    o.stop(inicio + duracao + 0.05)
  }

  function pluck(f, inicio) {
    const o = ctx.createOscillator()
    o.type = 'triangle'
    o.frequency.value = f
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, inicio)
    g.gain.exponentialRampToValueAtTime(0.085, inicio + 0.015)
    g.gain.exponentialRampToValueAtTime(0.0001, inicio + 1.9)
    o.connect(g).connect(barramento)
    o.start(inicio)
    o.stop(inicio + 2)
  }

  function agendarAcorde() {
    const t0 = proximo
    const ac = ACORDES[indice % ACORDES.length]
    ac.notas.forEach((n) => nota(freq(n), t0, DURACAO + 1.5, 'triangle', 0.034, 1.4, 2.2))
    nota(freq(ac.raiz), t0, DURACAO + 0.5, 'sine', 0.09, 0.6, 1.5)
    for (let k = 0; k < 5; k++) {
      const n = ac.notas[Math.floor(Math.random() * ac.notas.length)] + 12
      pluck(freq(n), t0 + 0.5 + k * ((DURACAO - 0.5) / 5) + Math.random() * 0.25)
    }
    proximo = t0 + DURACAO
    indice++
  }

  function ciclo() {
    while (proximo < ctx.currentTime + 6) agendarAcorde()
  }

  return {
    iniciar() {
      if (!ctx) montar()
      clearTimeout(suspender)
      ctx.resume()
      proximo = ctx.currentTime + 0.1
      clearInterval(temporizador)
      ciclo()
      temporizador = setInterval(ciclo, 1000)
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(volume * 0.9, ctx.currentTime, 0.8)
    },
    parar() {
      if (!ctx) return
      clearInterval(temporizador)
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.4)
      suspender = setTimeout(() => ctx.suspend(), 2000)
    },
    definirVolume(v) {
      volume = v
      if (ctx && temporizador) master.gain.setTargetAtTime(v * 0.9, ctx.currentTime, 0.1)
    },
  }
}
