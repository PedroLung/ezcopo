import { useState } from 'react'
import { Inbox } from 'lucide-react'
import { useGame } from '../GameContext'

// Iniciais do remetente para o "avatar" do e-mail
const iniciais = (nome) =>
  nome
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

// Caixa de entrada: cada mensagem do caso aparece como um e-mail de texto.
export default function Mensagens() {
  const { caso } = useGame()
  const [aberta, setAberta] = useState(caso.mensagens[0].id)
  const msg = caso.mensagens.find((m) => m.id === aberta)
  const [nome, cargo] = msg.de.split(/\s*\((.*)\)\s*$/)

  return (
    <div className="mensagens">
      <div className="mensagens-lista">
        <div className="caixa-titulo"><Inbox size={15} /> Caixa de entrada</div>
        <ul>
          {caso.mensagens.map((m) => (
            <li key={m.id} className={m.id === aberta ? 'sel' : ''} onClick={() => setAberta(m.id)}>
              <strong>{m.de.replace(/\s*\(.*\)\s*$/, '')}</strong>
              <span className="assunto">{m.assunto}</span>
              <small>{m.data}</small>
            </li>
          ))}
        </ul>
      </div>

      <article className="email">
        <h3>{msg.assunto}</h3>
        <div className="email-cabecalho">
          <span className="avatar">{iniciais(msg.de)}</span>
          <div>
            <div><b>{nome}</b>{cargo && <span className="cargo"> · {cargo}</span>}</div>
            <div className="para">Para: você · {msg.data}</div>
          </div>
        </div>
        <div className="email-texto">{msg.texto}</div>
      </article>
    </div>
  )
}
