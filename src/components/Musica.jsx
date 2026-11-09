import { useEffect, useRef, useState } from 'react'
import { Music, VolumeX, Bell, BellOff } from 'lucide-react'
import { criarGerador } from '../musica/gerador'
import { instalarCliques, definirEfeitos, efeitosLigados } from '../som/efeitos'

// Controles de som: música de fundo e efeitos sonoros.
// Música: toca public/audio/musica.mp3 se existir; senão, usa a trilha ambiente gerada pelo jogo.
// O navegador só libera som depois do primeiro clique, então a música começa no primeiro clique do jogador.
const ARQUIVO = 'audio/musica.mp3'

function ler(chave, padrao) {
  try {
    const v = localStorage.getItem(chave)
    return v === null ? padrao : v
  } catch {
    return padrao
  }
}
function guardar(chave, valor) {
  try {
    localStorage.setItem(chave, valor)
  } catch {
    /* sem armazenamento: tudo bem */
  }
}

export default function Musica() {
  const [ligada, setLigada] = useState(() => ler('ezcopo_musica', 'on') === 'on')
  const [volume, setVolume] = useState(() => Number(ler('ezcopo_volume', '0.3')))
  const [efeitos, setEfeitos] = useState(() => efeitosLigados())
  const audio = useRef(null)
  const gerador = useRef(null)
  const modo = useRef('arquivo') // 'arquivo' ou 'gerador'
  const tocando = useRef(false)
  const ligadaRef = useRef(ligada)
  const volumeRef = useRef(volume)
  ligadaRef.current = ligada
  volumeRef.current = volume

  function tocarMusica() {
    tocando.current = true
    if (modo.current === 'gerador') {
      gerador.current.definirVolume(volumeRef.current)
      gerador.current.iniciar()
      return
    }
    audio.current.volume = volumeRef.current
    audio.current.play().catch(() => {
      // sem arquivo (ou bloqueado): usa a trilha gerada
      modo.current = 'gerador'
      if (tocando.current) tocarMusica()
    })
  }

  function pausar() {
    tocando.current = false
    audio.current?.pause()
    gerador.current?.parar()
  }

  useEffect(() => {
    gerador.current = criarGerador()
    const a = new Audio(import.meta.env.BASE_URL + ARQUIVO)
    a.loop = true
    a.preload = 'auto'
    a.addEventListener('error', () => {
      modo.current = 'gerador'
      if (tocando.current) tocarMusica()
    })
    audio.current = a

    // Começa no primeiro clique/toque/tecla (regra dos navegadores)
    const liberar = () => {
      if (ligadaRef.current && !tocando.current) tocarMusica()
    }
    window.addEventListener('pointerdown', liberar, { once: true })
    window.addEventListener('keydown', liberar, { once: true })
    const removerCliques = instalarCliques()

    return () => {
      window.removeEventListener('pointerdown', liberar)
      window.removeEventListener('keydown', liberar)
      removerCliques()
      pausar()
    }
  }, [])

  function alternarMusica() {
    const nova = !ligada
    setLigada(nova)
    guardar('ezcopo_musica', nova ? 'on' : 'off')
    if (nova) tocarMusica()
    else pausar()
  }

  function alternarEfeitos() {
    const novo = !efeitos
    setEfeitos(novo)
    definirEfeitos(novo)
  }

  function mudarVolume(e) {
    const v = Number(e.target.value)
    setVolume(v)
    guardar('ezcopo_volume', String(v))
    if (audio.current) audio.current.volume = v
    gerador.current?.definirVolume(v)
  }

  return (
    <div className="musica">
      <button onClick={alternarMusica} aria-label={ligada ? 'Desligar música' : 'Ligar música'} title={ligada ? 'Desligar música' : 'Ligar música'}>
        {ligada ? <Music size={16} /> : <VolumeX size={16} />}
      </button>
      <input type="range" min="0" max="1" step="0.05" value={volume} onChange={mudarVolume} aria-label="Volume da música" />
      <button
        className={efeitos ? '' : 'mudo'}
        onClick={alternarEfeitos}
        aria-label={efeitos ? 'Desligar efeitos sonoros' : 'Ligar efeitos sonoros'}
        title={efeitos ? 'Desligar efeitos sonoros' : 'Ligar efeitos sonoros'}
      >
        {efeitos ? <Bell size={16} /> : <BellOff size={16} />}
      </button>
    </div>
  )
}
