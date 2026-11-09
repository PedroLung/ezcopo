import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

export default function Chamados() {
  const { caso } = useGame()
  return (
    <Tabela
      tipo="cham"
      linhas={caso.chamados}
      pegarId={(l) => l.id}
      resumo={(l) => `Chamado ${l.id} (${l.data}): ${l.descricao}, solicitante ${l.solicitante}, aprovador ${l.aprovador}, ${l.status}`}
      dicaBusca="chamado, usuário, descrição..."
      colunas={[
        { chave: 'id', titulo: 'Chamado' },
        { chave: 'data', titulo: 'Data' },
        { chave: 'solicitante', titulo: 'Solicitante', filtravel: true },
        { chave: 'descricao', titulo: 'Descrição' },
        { chave: 'aprovador', titulo: 'Aprovador', filtravel: true },
        { chave: 'status', titulo: 'Status' },
      ]}
    />
  )
}
