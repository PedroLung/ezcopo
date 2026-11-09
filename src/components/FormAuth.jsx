import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { tocar } from '../som/efeitos'

// Entrar ou criar conta: nick, e-mail e senha.
export default function FormAuth({ onSucesso }) {
  const { entrar, cadastrar } = useAuth()
  const [modo, setModo] = useState('entrar') // 'entrar' | 'cadastrar'
  const [nick, setNick] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [msg, setMsg] = useState(null) // { tipo: 'erro' | 'aviso', texto }

  async function enviar(e) {
    e.preventDefault()
    setMsg(null)

    if (modo === 'cadastrar') {
      if (!/^[A-Za-z0-9_]{3,20}$/.test(nick.trim())) {
        setMsg({ tipo: 'erro', texto: 'O nick deve ter de 3 a 20 caracteres: letras, números ou _ (sem espaços).' })
        return
      }
      if (senha.length < 6) {
        setMsg({ tipo: 'erro', texto: 'A senha precisa ter pelo menos 6 caracteres.' })
        return
      }
    }

    setEnviando(true)
    const r = modo === 'entrar' ? await entrar(email.trim(), senha) : await cadastrar(nick.trim(), email.trim(), senha)
    setEnviando(false)

    if (r.erro) {
      tocar('erro')
      setMsg({ tipo: 'erro', texto: r.erro })
    } else if (r.aviso) setMsg({ tipo: 'aviso', texto: r.aviso })
    else {
      tocar('sucesso')
      onSucesso()
    }
  }

  return (
    <form className="form-auth" onSubmit={enviar}>
      <div className="abas">
        <button type="button" className={modo === 'entrar' ? 'aba ativa' : 'aba'} onClick={() => { setModo('entrar'); setMsg(null) }}>Entrar</button>
        <button type="button" className={modo === 'cadastrar' ? 'aba ativa' : 'aba'} onClick={() => { setModo('cadastrar'); setMsg(null) }}>Criar conta</button>
      </div>

      {modo === 'cadastrar' && (
        <label>
          Nick (o nome que aparece no ranking)
          <input value={nick} onChange={(e) => setNick(e.target.value)} placeholder="ex.: auditor_zeca" maxLength={20} autoComplete="nickname" />
        </label>
      )}
      <label>
        E-mail
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" autoComplete="email" required />
      </label>
      <label>
        Senha
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="mínimo 6 caracteres" autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'} required />
      </label>

      {msg && <p className={msg.tipo === 'erro' ? 'msg-erro' : 'msg-aviso'}>{msg.texto}</p>}

      <button type="submit" className="btn-grande" disabled={enviando}>
        {enviando ? 'Aguarde...' : modo === 'entrar' ? 'Entrar' : 'Criar conta e entrar'}
      </button>
    </form>
  )
}
