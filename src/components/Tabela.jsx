import { useState } from 'react'
import { Search, Pin, Check, X } from 'lucide-react'
import { useGame } from '../GameContext'

// Tabela genérica com busca, filtro por clique e botão "Fixar" (manda a linha pro Caderno).
// colunas: [{ chave, titulo, filtravel?, badge? }]
//   filtravel: clicar na célula preenche a busca com aquele valor
//   badge: colore o texto conforme o resultado (OK / FALHA / NEGADO)
// tipo: prefixo do id da evidência (ex.: "memo")
export default function Tabela({ colunas, linhas, tipo, pegarId, resumo, dicaBusca }) {
  const { fixados, alternarFixo } = useGame()
  const [busca, setBusca] = useState('')

  const termo = busca.trim().toLowerCase()
  const filtradas = linhas.filter((l) =>
    termo === '' ? true : colunas.some((c) => String(l[c.chave]).toLowerCase().includes(termo)),
  )

  function classeBadge(valor) {
    const v = String(valor)
    if (v.startsWith('OK')) return 'b-ok'
    if (v.startsWith('NEGADO')) return 'b-neg'
    if (v.startsWith('FALHA')) return 'b-falha'
    return ''
  }

  return (
    <div>
      <div className="tabela-barra">
        <label className="busca">
          <Search size={15} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder={dicaBusca || 'Buscar...'} />
        </label>
        {busca && (
          <button className="btn-pequeno" onClick={() => setBusca('')}><X size={13} /> Limpar</button>
        )}
        <span className="contagem">{filtradas.length} de {linhas.length}</span>
      </div>
      <div className="tabela-scroll">
        <table>
          <thead>
            <tr>
              {colunas.map((c) => <th key={c.chave}>{c.titulo}</th>)}
              <th>Evidência</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.length === 0 && (
              <tr><td colSpan={colunas.length + 1}>Nenhum registro encontrado para essa busca.</td></tr>
            )}
            {filtradas.map((l) => {
              const idEv = `${tipo}:${pegarId(l)}`
              const fixado = fixados.some((f) => f.id === idEv)
              return (
                <tr key={idEv} className={fixado ? 'fixada' : ''}>
                  {colunas.map((c) => (
                    <td key={c.chave} className={c.badge ? classeBadge(l[c.chave]) : ''}>
                      {c.filtravel ? (
                        <button className="link" title="Clique para filtrar" onClick={() => setBusca(String(l[c.chave]))}>
                          {l[c.chave]}
                        </button>
                      ) : (
                        l[c.chave]
                      )}
                    </td>
                  ))}
                  <td>
                    <button
                      className={fixado ? 'btn-fixo ativo' : 'btn-fixo'}
                      data-som={fixado ? 'desfixar' : 'fixar'}
                      onClick={() => alternarFixo({ id: idEv, tipo, resumo: resumo(l) })}
                    >
                      {fixado ? <Check size={13} /> : <Pin size={13} />} {fixado ? 'Fixado' : 'Fixar'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
