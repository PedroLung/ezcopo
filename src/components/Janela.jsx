import { useRef, useState } from 'react'
import { Minus, X, Lightbulb, ChevronDown, ChevronRight } from 'lucide-react'
import { useGame } from '../GameContext'
import Icone from './Icones'

// Janela arrastável. "ajuda" é a faixa "Para que serve" no topo da janela.
export default function Janela({ id, titulo, z, largura = 560, inicial = { x: 120, y: 30 }, ajuda, children }) {
  const { fechar, focar, minimizar } = useGame()
  const [pos, setPos] = useState(inicial)
  const [ajudaAberta, setAjudaAberta] = useState(true)
  const arrasto = useRef(null)

  function aoPressionar(e) {
    if (e.target.closest('button')) return
    focar(id)
    arrasto.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function aoMover(e) {
    if (!arrasto.current) return
    setPos({
      x: Math.max(0, e.clientX - arrasto.current.dx),
      y: Math.max(0, e.clientY - arrasto.current.dy),
    })
  }

  return (
    <div className="janela" style={{ left: pos.x, top: pos.y, width: largura, zIndex: z }} onPointerDown={() => focar(id)}>
      <div
        className="janela-titulo"
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={() => (arrasto.current = null)}
      >
        <span className="janela-nome">
          <Icone nome={id} tamanho={24} /> {titulo}
        </span>
        <span className="janela-botoes">
          <button data-som="fechar" onClick={() => minimizar(id)} aria-label="Minimizar"><Minus size={14} /></button>
          <button data-som="fechar" onClick={() => fechar(id)} aria-label="Fechar"><X size={14} /></button>
        </span>
      </div>
      {ajuda && (
        <div className="ajuda">
          <button className="ajuda-toggle" onClick={() => setAjudaAberta(!ajudaAberta)}>
            <Lightbulb size={15} /> Para que serve esta janela?
            {ajudaAberta ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>
          {ajudaAberta && <div className="ajuda-texto">{ajuda}</div>}
        </div>
      )}
      <div className="janela-corpo">{children}</div>
    </div>
  )
}
