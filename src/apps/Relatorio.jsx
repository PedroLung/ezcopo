import { useState } from 'react'
import { Check, CircleCheck, CircleX, ArrowRight, ArrowLeft, RotateCcw, Flag, Send } from 'lucide-react'
import { useGame } from '../GameContext'
import { corrigir, respostasVazias } from '../grade'
import { tocar } from '../som/efeitos'

function alternar(lista, valor) {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]
}

function Campo({ numero, titulo, ajuda, feito, children }) {
  return (
    <section className={feito ? 'campo ok' : 'campo'}>
      <h4>
        <span className="num">{numero}</span> {titulo}
        {feito && <Check size={16} className="check-ok" />}
      </h4>
      <p className="campo-ajuda">{ajuda}</p>
      {children}
    </section>
  )
}

export default function Relatorio() {
  const { caso, fixados, marcarEntregue, temProximo, proximoCaso, registrarNota, setResumoAberto } = useGame()
  const campos = caso.relatorio.campos
  const [resp, setResp] = useState(() => respostasVazias(caso))
  const [resultado, setResultado] = useState(null)

  const preenchido = (c) => (c.tipo === 'select' ? resp[c.id] !== '' : resp[c.id].length > 0)
  const completo = campos.every(preenchido)

  function enviar(e) {
    e.preventDefault()
    // Evidência removida do Caderno depois de marcada não conta
    const ids = fixados.map((f) => f.id)
    const limpa = { ...resp }
    for (const c of campos) if (c.tipo === 'evidencias') limpa[c.id] = resp[c.id].filter((id) => ids.includes(id))
    const r = corrigir(limpa, caso)
    tocar(r.total >= 70 ? 'sucesso' : 'regular')
    setResultado(r)
    registrarNota(caso.id, r.total)
    marcarEntregue()
  }

  if (resultado) {
    return (
      <div className="resultado">
        <div className="nota">
          <span>Parecer final da fase</span>
          <strong>{resultado.total}<small>/100</small></strong>
        </div>
        <ul className="itens-resultado">
          {resultado.itens.map((i) => (
            <li key={i.id} className={i.ok ? 'acerto' : 'erro'}>
              <span className="icone-res">{i.ok ? <CircleCheck size={20} /> : <CircleX size={20} />}</span>
              <div>
                <div className="linha-res"><b>{i.titulo}</b><span className="pts">{i.pontos}/{i.max}</span></div>
                <p>{i.explicacao}</p>
                <small className="ref">Livro: {i.ref}</small>
              </div>
            </li>
          ))}
        </ul>
        <h4>Resumo da fase</h4>
        <p className="caixa">{caso.debriefing}</p>
        <h4>Onde está no livro</h4>
        <ul className="refs">
          {caso.referencias.map((r) => (
            <li key={r.pagina + r.uso}><b>{r.pagina}</b> (item {r.item}): {r.uso}</li>
          ))}
        </ul>
        <p className="refs-fonte">
          Fonte: CREPALDI, Silvio Aparecido. <i>Auditoria contábil: ferramenta de controle e informação</i>. Uberlândia: [s.n.], 2025. Cap. 4, seção 4.9.
        </p>
        <div className="resultado-botoes">
          <button onClick={() => setResultado(null)}><ArrowLeft size={15} /> Voltar e revisar</button>
          <button onClick={() => { setResp(respostasVazias(caso)); setResultado(null) }}><RotateCcw size={15} /> Refazer</button>
          {temProximo ? (
            <button className="btn-grande primario btn-proximo" onClick={proximoCaso}>Próxima fase <ArrowRight size={16} /></button>
          ) : (
            <button className="btn-grande primario btn-proximo" onClick={() => setResumoAberto(true)}><Flag size={16} /> Ver resumo final</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <form className="relatorio" onSubmit={enviar}>
      {campos.map((c, i) => (
        <Campo key={c.id} numero={i + 1} titulo={c.titulo} ajuda={c.ajuda} feito={preenchido(c)}>
          {c.tipo === 'select' && (
            <select value={resp[c.id]} onChange={(e) => setResp({ ...resp, [c.id]: e.target.value })}>
              <option value="">Selecione...</option>
              {c.opcoes.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          )}

          {c.tipo === 'multi' && c.opcoes.map((o) => (
            <label key={o.id} className="check">
              <input
                type="checkbox"
                checked={resp[c.id].includes(o.id)}
                onChange={() => setResp({ ...resp, [c.id]: alternar(resp[c.id], o.id) })}
              />
              <span>{o.label}</span>
            </label>
          ))}

          {c.tipo === 'evidencias' && (
            <>
              {fixados.filter((f) => !c.filtro || f.tipo === c.filtro).length === 0 && (
                <p className="vazio">Você ainda não fixou nenhum item desta pergunta. Volte ao quadro certo e use "Fixar" nas linhas importantes.</p>
              )}
              {fixados.filter((f) => !c.filtro || f.tipo === c.filtro).map((f) => (
                <label key={f.id} className="check">
                  <input
                    type="checkbox"
                    checked={resp[c.id].includes(f.id)}
                    onChange={() => setResp({ ...resp, [c.id]: alternar(resp[c.id], f.id) })}
                  />
                  <span><code>{f.id}</code> {f.resumo}</span>
                </label>
              ))}
            </>
          )}
        </Campo>
      ))}

      <div className="enviar">
        <button type="submit" className="btn-grande primario" disabled={!completo}><Send size={16} /> Entregar relatório</button>
        {!completo && <small>Responda todas as perguntas para entregar.</small>}
      </div>
    </form>
  )
}
