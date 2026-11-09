import { useState } from 'react'
import { Info } from 'lucide-react'
import { useAuth } from '../AuthContext'
import { tocar } from '../som/efeitos'
import TextoPrivacidade from './TextoPrivacidade'

// Entrar ou criar conta: nick, e-mail e senha.
export default function FormAuth({ onSucesso }) {
  const { entrar, cadastrar } = useAuth()
  const [modo, setModo] = useState('entrar') // 'entrar' | 'cadastrar'
  const [nick, setNick] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [aceito, setAceito] = useState(false) // aceite da política de privacidade (só no cadastro)
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
      if (!aceito) {
        setMsg({ tipo: 'erro', texto: 'Para criar a conta, leia e aceite a política de privacidade.' })
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
      {modo === 'cadastrar' && (
        <p className="dica-email">
          <Info size={15} />
          <span>
            <b>Você não precisa usar seu e-mail pessoal.</b> Pode usar um e-mail secundário ou de teste, até um que
            você crie só para o jogo. Só não use o e-mail de outra pessoa. Como não enviamos e-mail de recuperação,
            <b> anote sua senha</b>: se esquecer, será preciso criar outra conta.
          </span>
        </p>
      )}

      <label>
        Senha
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="mínimo 6 caracteres" autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'} required />
      </label>

      {modo === 'cadastrar' && (
        <div className="consentimento">
          <label className="check-consent">
            <input type="checkbox" checked={aceito} onChange={(e) => setAceito(e.target.checked)} />
            <span>Li e aceito a política de privacidade. Autorizo o uso do meu nick, e-mail e notas para o jogo e para a professora acompanhar o desempenho.</span>
          </label>
          <details>
            <summary>Ler a política de privacidade</summary>
            <TextoPrivacidade />
          </details>
        </div>
      )}

      {msg && <p className={msg.tipo === 'erro' ? 'msg-erro' : 'msg-aviso'}>{msg.texto}</p>}

      <button type="submit" className="btn-grande" disabled={enviando}>
        {enviando ? 'Aguarde...' : modo === 'entrar' ? 'Entrar' : 'Criar conta e entrar'}
      </button>
    </form>
  )
}
