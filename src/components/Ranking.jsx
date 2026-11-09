import { useEffect, useState } from 'react'
import { Medal, RefreshCw } from 'lucide-react'
import { supabase } from '../supabase'
import { useAuth } from '../AuthContext'
import { CASOS } from '../cases'

const MEDALHA = ['#d9a521', '#9aa3ad', '#b87a4b'] // ouro, prata, bronze

// Ranking geral: soma da melhor nota de cada fase (máximo = 100 x número de fases).
export default function Ranking() {
  const { usuario } = useAuth()
  const [linhas, setLinhas] = useState(null)
  const [erro, setErro] = useState('')

  async function carregar() {
    setLinhas(null)
    setErro('')
    const { data, error } = await supabase.rpc('ranking')
    if (error) setErro('Não foi possível carregar o ranking.')
    else setLinhas(data)
  }

  useEffect(() => {
    carregar()
  }, [])

  return (
    <div>
      <p className="menu-sub">Soma da melhor nota de cada fase (máximo {CASOS.length * 100} pontos).</p>
      {erro && <p className="msg-erro">{erro}</p>}
      {!erro && linhas === null && <p>Carregando...</p>}
      {linhas && linhas.length === 0 && <p>Ninguém pontuou ainda. Seja o primeiro!</p>}
      {linhas && linhas.length > 0 && (
        <div className="tabela-scroll">
          <table>
            <thead>
              <tr><th>#</th><th>Jogador</th><th>Fases</th><th>Pontos</th></tr>
            </thead>
            <tbody>
              {linhas.map((l, i) => (
                <tr key={l.nick} className={l.nick === usuario?.nick ? 'fixada' : ''}>
                  <td>{i < 3 ? <Medal size={18} color={MEDALHA[i]} /> : i + 1}</td>
                  <td>{l.nick}</td>
                  <td>{l.fases}/{CASOS.length}</td>
                  <td><b>{l.total}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p><button onClick={carregar}><RefreshCw size={14} /> Atualizar</button></p>
    </div>
  )
}
