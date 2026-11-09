import { useEffect, useMemo, useState } from 'react'
import { Search, RefreshCw, Download } from 'lucide-react'
import { supabase } from '../supabase'
import { CASOS } from '../cases'

const fmtData = (iso) => (iso ? new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '-')

// Painel da professora: todos os alunos com nick, e-mail e a nota de cada fase.
// O banco só entrega esses dados para contas com role = 'professor'.
export default function Professor() {
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')

  async function carregar() {
    setDados(null)
    setErro('')
    const { data, error } = await supabase.rpc('painel_professor')
    if (error) setErro('Acesso negado ou erro ao carregar. Sua conta precisa ser de professor.')
    else setDados(data)
  }

  useEffect(() => {
    carregar()
  }, [])

  // Uma linha por aluno, com as notas em colunas
  const alunos = useMemo(() => {
    const mapa = {}
    for (const r of dados || []) {
      const a = (mapa[r.nick] ??= { nick: r.nick, email: r.email, notas: {}, ultima: null })
      if (r.fase) {
        a.notas[r.fase] = r.nota
        if (!a.ultima || r.atualizado_em > a.ultima) a.ultima = r.atualizado_em
      }
    }
    return Object.values(mapa).map((a) => ({
      ...a,
      total: CASOS.reduce((s, c) => s + (a.notas[c.id] ?? 0), 0),
    }))
  }, [dados])

  const termo = busca.trim().toLowerCase()
  const filtrados = alunos.filter((a) => !termo || a.nick.toLowerCase().includes(termo) || a.email.toLowerCase().includes(termo))

  function baixarCsv() {
    const cab = ['Nick', 'E-mail', ...CASOS.map((c) => c.titulo), 'Total', 'Última atividade']
    const linhas = alunos.map((a) => [a.nick, a.email, ...CASOS.map((c) => a.notas[c.id] ?? ''), a.total, fmtData(a.ultima)])
    const csv = [cab, ...linhas].map((l) => l.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\r\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'notas-ezcopo.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div>
      {erro && <p className="msg-erro">{erro}</p>}
      {!erro && dados === null && <p>Carregando...</p>}
      {dados && (
        <>
          <div className="tabela-barra">
            <label className="busca"><Search size={15} /><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="nick ou e-mail" /></label>
            <span className="contagem">{filtrados.length} de {alunos.length} alunos</span>
          </div>
          <div className="tabela-scroll">
            <table>
              <thead>
                <tr>
                  <th>Nick</th><th>E-mail</th>
                  {CASOS.map((c, i) => <th key={c.id}>Fase {i + 1}</th>)}
                  <th>Total</th><th>Última atividade</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length === 0 && <tr><td colSpan={CASOS.length + 4}>Nenhum aluno encontrado.</td></tr>}
                {filtrados.map((a) => (
                  <tr key={a.nick}>
                    <td>{a.nick}</td>
                    <td>{a.email}</td>
                    {CASOS.map((c) => <td key={c.id}>{a.notas[c.id] ?? '-'}</td>)}
                    <td><b>{a.total}</b></td>
                    <td>{fmtData(a.ultima)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <button onClick={carregar}><RefreshCw size={14} /> Atualizar</button>{' '}
            <button onClick={baixarCsv}><Download size={14} /> Baixar planilha (CSV)</button>
          </p>
        </>
      )}
    </div>
  )
}
