import { useGame } from '../GameContext'

// Trechos do livro de Crepaldi (2025). Cada item mostra a página de origem.
export default function Normas() {
  const { caso } = useGame()
  return (
    <div className="normas">
      <p>Trechos do livro <i>Auditoria Contábil</i> (CREPALDI, 2025), capítulo 4, seção 4.9. Clique num item para ler.</p>
      <p className="base-livro"><b>Base desta fase:</b> {caso.baseLivro}</p>
      {caso.normas.map((n) => (
        <details key={n.id}>
          <summary>
            <strong>{n.titulo}</strong> <span className="ref">({n.ref})</span>
          </summary>
          <p>{n.texto}</p>
          <p className="ref">Fonte: CREPALDI, 2025, {n.ref}.</p>
        </details>
      ))}
    </div>
  )
}
