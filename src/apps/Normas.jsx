import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { useGame } from '../GameContext'

// Quebra o resumo em frases (uma por linha) para facilitar a leitura.
// Só divide em ". " seguido de letra maiúscula ou "(", então "p. 146" e "art. 27" não são cortados.
const frases = (texto) =>
  texto
    .split(/\.\s+(?=[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ(])/)
    .map((f, i, todas) => (i < todas.length - 1 ? `${f}.` : f))

// Trechos do livro de Crepaldi (2025), em abas: escolha o tópico e leia o resumo com a página.
export default function Normas() {
  const { caso } = useGame()
  const [escolhida, setEscolhida] = useState(caso.normas[0].id)
  const norma = caso.normas.find((n) => n.id === escolhida)

  return (
    <div className="normas">
      <p className="base-livro"><b>Base desta fase:</b> {caso.baseLivro}</p>
      <div className="normas-layout">
        <div className="normas-abas" role="tablist" aria-label="Tópicos da norma">
          {caso.normas.map((n) => (
            <button
              key={n.id}
              role="tab"
              aria-selected={n.id === escolhida}
              className={n.id === escolhida ? 'aba-norma ativa' : 'aba-norma'}
              onClick={() => setEscolhida(n.id)}
            >
              <span className="aba-titulo">{n.titulo}</span>
              <span className="aba-ref">{n.ref}</span>
            </button>
          ))}
        </div>

        <article className="norma-texto" role="tabpanel">
          <h4>{norma.titulo}</h4>
          <span className="pagina"><BookOpen size={13} /> Livro, {norma.ref}</span>
          {frases(norma.texto).map((f, i) => <p key={i}>{f}</p>)}
          <p className="ref">Fonte: CREPALDI, 2025, {norma.ref}.</p>
        </article>
      </div>
    </div>
  )
}
