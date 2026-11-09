import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

export default function Contas() {
  const { caso } = useGame()
  return (
    <Tabela
      tipo="conta"
      linhas={caso.contas}
      pegarId={(l) => l.usuario}
      resumo={(l) => `Conta ${l.usuario} (func. ${l.func}): perfil ${l.perfil}, status ${l.status}, último login ${l.ultimoLogin}`}
      colunas={[
        { chave: 'usuario', titulo: 'Usuário', filtravel: true },
        { chave: 'func', titulo: 'Func.' },
        { chave: 'perfil', titulo: 'Perfil' },
        { chave: 'status', titulo: 'Status' },
        { chave: 'ultimoLogin', titulo: 'Último login' },
      ]}
    />
  )
}
