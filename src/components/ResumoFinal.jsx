import { Flag, Trophy, RotateCcw, X } from 'lucide-react'
import { useGame } from '../GameContext'
import { useAuth } from '../AuthContext'
import { CASOS } from '../cases'

function conceito(media) {
  if (media >= 90) return 'Excelente: você domina a revisão pelos pares.'
  if (media >= 70) return 'Muito bom: você entendeu a maior parte da norma.'
  if (media >= 50) return 'Bom caminho: releia os itens em que errou e tente de novo.'
  return 'Vale rever a seção 4.9 do livro e refazer as fases.'
}

// Resumo final: nota de cada fase, média e as páginas do livro de cada uma.
export default function ResumoFinal() {
  const { resumoAberto, setResumoAberto, notas, reiniciar, setTela, setPainelMenu } = useGame()
  const { usuario } = useAuth()
  if (!resumoAberto) return null

  const feitas = CASOS.filter((c) => notas[c.id] !== undefined)
  const media = feitas.length ? Math.round(feitas.reduce((s, c) => s + notas[c.id], 0) / feitas.length) : 0
  const completo = feitas.length === CASOS.length

  return (
    <div className="intro-fundo">
      <div className="intro resumo">
        <div className="intro-corpo">
          <span className="selo"><Flag size={13} /> Resumo final</span>
          <div className="nota">
            <span>{completo ? `Média das ${CASOS.length} fases` : `Média parcial (${feitas.length} de ${CASOS.length} fases)`}</span>
            <strong>{media}<small>/100</small></strong>
          </div>
          <p>{feitas.length ? conceito(media) : 'Você ainda não entregou nenhum relatório.'}</p>

          <div className="tabela-scroll">
            <table>
              <thead>
                <tr><th>Fase</th><th>Nota</th><th>Onde está no livro</th></tr>
              </thead>
              <tbody>
                {CASOS.map((c) => (
                  <tr key={c.id}>
                    <td><b>{c.titulo}</b></td>
                    <td>{notas[c.id] !== undefined ? `${notas[c.id]}/100` : 'não feita'}</td>
                    <td className="ref">{c.baseLivro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="refs-fonte">
            Fonte de todo o conteúdo: CREPALDI, Silvio Aparecido. <i>Auditoria contábil: ferramenta de controle e informação</i>. Uberlândia: [s.n.], 2025. Cap. 4, seção 4.9, p. 142 a 149.
          </p>

          <div className="resultado-botoes">
            <button onClick={() => setResumoAberto(false)}><X size={15} /> Fechar</button>
            {usuario && (
              <button onClick={() => { setResumoAberto(false); setPainelMenu('ranking'); setTela('menu') }}>
                <Trophy size={15} /> Ver ranking
              </button>
            )}
            <button className="primario btn-proximo" onClick={reiniciar}><RotateCcw size={15} /> Jogar tudo de novo</button>
          </div>
        </div>
      </div>
    </div>
  )
}
