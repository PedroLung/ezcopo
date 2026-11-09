import { useEffect, useRef, useState } from 'react'
import { tocar } from '../som/efeitos'
import { ClipboardList, Check, ArrowRight, Circle, Lightbulb, ChevronDown, ChevronUp, PartyPopper } from 'lucide-react'
import { useGame } from '../GameContext'

// Painel fixo com a lista de missões. A missão atual explica o que fazer e o ícone dela pisca.
export default function PainelMissoes({ nomeApps }) {
  const { missoes, missaoAtual, abrir } = useGame()
  const [dica, setDica] = useState(false)
  const [recolhido, setRecolhido] = useState(false)
  const feitas = missoes.filter((m) => m.concluida).length

  // "Ding" cada vez que uma missão é concluída
  const anterior = useRef(feitas)
  useEffect(() => {
    if (feitas > anterior.current) tocar('ding')
    anterior.current = feitas
  }, [feitas])

  return (
    <aside className="missoes">
      <div className="missoes-topo" onClick={() => setRecolhido(!recolhido)}>
        <strong><ClipboardList size={16} /> Missão do auditor</strong>
        <span>{feitas}/{missoes.length} {recolhido ? <ChevronDown size={15} /> : <ChevronUp size={15} />}</span>
      </div>
      {!recolhido && (
        <div className="missoes-corpo">
          <div className="barra"><div style={{ width: `${(feitas / missoes.length) * 100}%` }} /></div>
          <ol>
            {missoes.map((m) => (
              <li key={m.id} className={m.concluida ? 'feita' : m === missaoAtual ? 'atual' : ''}>
                <span className="marca-m">
                  {m.concluida ? <Check size={15} /> : m === missaoAtual ? <ArrowRight size={15} /> : <Circle size={13} />}
                </span>
                <div>
                  <div className="titulo-m">{m.titulo}</div>
                  {m === missaoAtual && (
                    <div className="detalhe-m">
                      <p>{m.detalhe}</p>
                      <div className="detalhe-botoes">
                        <button className="primario" data-som="abrir" onClick={() => abrir(m.app)}>Abrir {nomeApps[m.app]}</button>
                        <button onClick={() => setDica(!dica)}><Lightbulb size={14} /> {dica ? 'Esconder dica' : 'Dica'}</button>
                      </div>
                      {dica && <p className="dica">{m.dica}</p>}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {!missaoAtual && <p className="parabens"><PartyPopper size={16} /> Missão cumprida! Veja seu parecer no Relatório.</p>}
        </div>
      )}
    </aside>
  )
}
