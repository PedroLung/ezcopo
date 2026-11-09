// Corretor genérico: cada fase define seus campos em caso.relatorio.campos.
// Tipos de campo:
//  - select: uma resposta; vale o peso inteiro se acertar
//  - multi: várias respostas; acertos menos erros, proporcional
//  - evidencias: itens do Caderno; (acertos - erradas) / minimo, limitado a 0..1
// A soma dos pesos de uma fase é 100.

export function corrigir(respostas, caso) {
  const itens = caso.relatorio.campos.map((c) => {
    const r = respostas[c.id]
    let frac = 0

    if (c.tipo === 'select') {
      frac = r === c.correto ? 1 : 0
    } else if (c.tipo === 'multi') {
      const acertos = r.filter((x) => c.correto.includes(x)).length
      const erros = r.length - acertos
      frac = Math.max(0, (acertos - erros) / c.correto.length)
    } else if (c.tipo === 'evidencias') {
      const acertos = r.filter((x) => c.correto.includes(x)).length
      const erradas = r.length - acertos
      frac = Math.max(0, Math.min(1, (acertos - erradas) / c.minimo))
    }

    return {
      id: c.id,
      titulo: c.titulo,
      pontos: Math.round(c.peso * frac),
      max: c.peso,
      ok: frac >= 1,
      explicacao: c.explicacao,
      ref: c.ref,
    }
  })

  return { itens, total: itens.reduce((s, i) => s + i.pontos, 0) }
}

// Resposta inicial vazia para os campos de uma fase
export function respostasVazias(caso) {
  const r = {}
  for (const c of caso.relatorio.campos) r[c.id] = c.tipo === 'select' ? '' : []
  return r
}
