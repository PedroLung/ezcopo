import { useEffect, useState } from 'react'
import { Download, Trash2 } from 'lucide-react'
import { supabase } from '../supabase'
import { useAuth } from '../AuthContext'
import { useGame } from '../GameContext'
import { CASOS } from '../cases'

// "Meus dados": mostra o que está guardado, deixa baixar uma cópia e excluir a conta.
export default function MeusDados({ aoExcluir }) {
  const { usuario, excluirConta } = useAuth()
  const { notas } = useGame()
  const [aceite, setAceite] = useState(null)
  const [confirmando, setConfirmando] = useState(false)
  const [digitado, setDigitado] = useState('')
  const [erro, setErro] = useState('')
  const [excluindo, setExcluindo] = useState(false)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('aceitou_em, politica_versao')
      .eq('id', usuario.id)
      .maybeSingle()
      .then(({ data }) => setAceite(data))
  }, [usuario.id])

  const fmt = (iso) => (iso ? new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : 'não registrado')

  function baixar() {
    const dados = {
      nick: usuario.nick,
      email: usuario.email,
      aceite_da_politica: { data: aceite?.aceitou_em ?? null, versao: aceite?.politica_versao ?? null },
      melhores_notas: Object.fromEntries(CASOS.map((c) => [c.titulo, notas[c.id] ?? null])),
    }
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'meus-dados-ezcopo.json'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  async function excluir() {
    setExcluindo(true)
    setErro('')
    const r = await excluirConta()
    setExcluindo(false)
    if (r.erro) setErro(r.erro)
    else aoExcluir()
  }

  return (
    <div className="meus-dados">
      <h4>Meus dados</h4>
      <ul>
        <li><b>Nick:</b> {usuario.nick}</li>
        <li><b>E-mail:</b> {usuario.email}</li>
        <li><b>Aceitou a política em:</b> {fmt(aceite?.aceitou_em)}{aceite?.politica_versao ? ` (versão ${aceite.politica_versao})` : ''}</li>
        {CASOS.map((c) => (
          <li key={c.id}><b>{c.titulo}:</b> {notas[c.id] !== undefined ? `${notas[c.id]}/100` : 'ainda não feita'}</li>
        ))}
      </ul>

      <div className="resultado-botoes">
        <button onClick={baixar}><Download size={14} /> Baixar meus dados</button>
        {!confirmando && (
          <button className="perigo" onClick={() => setConfirmando(true)}><Trash2 size={14} /> Excluir minha conta</button>
        )}
      </div>

      {confirmando && (
        <div className="confirmar-exclusao">
          <p>
            <b>Isso apaga sua conta, suas notas e seu lugar no ranking, e não dá para desfazer.</b>{' '}
            Para confirmar, digite seu nick (<code>{usuario.nick}</code>).
          </p>
          <input value={digitado} onChange={(e) => setDigitado(e.target.value)} placeholder="digite seu nick" />
          {erro && <p className="msg-erro">{erro}</p>}
          <div className="resultado-botoes">
            <button className="perigo" disabled={digitado.trim().toLowerCase() !== usuario.nick.toLowerCase() || excluindo} onClick={excluir}>
              <Trash2 size={14} /> {excluindo ? 'Excluindo...' : 'Excluir definitivamente'}
            </button>
            <button onClick={() => { setConfirmando(false); setDigitado(''); setErro('') }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
