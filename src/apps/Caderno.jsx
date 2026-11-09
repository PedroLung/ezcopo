import { X, Pin } from 'lucide-react'
import { useGame } from '../GameContext'

export default function Caderno() {
  const { fixados, alternarFixo } = useGame()
  if (fixados.length === 0) {
    return (
      <p className="vazio">
        <Pin size={16} /> Nenhuma evidência fixada ainda. Use o botão "Fixar" nas tabelas.
      </p>
    )
  }
  return (
    <ul className="caderno">
      {fixados.map((f) => (
        <li key={f.id}>
          <code>{f.id}</code>
          <span>{f.resumo}</span>
          <button className="btn-pequeno" data-som="desfixar" onClick={() => alternarFixo(f)}><X size={13} /> Remover</button>
        </li>
      ))}
    </ul>
  )
}
