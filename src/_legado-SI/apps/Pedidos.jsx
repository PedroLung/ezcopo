import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

export default function Pedidos() {
  const { caso } = useGame()
  return (
    <Tabela
      tipo="ped"
      linhas={caso.pedidos}
      pegarId={(l) => l.id}
      resumo={(l) => `Pedido ${l.id} (${l.data}): ${l.descricao}, ${l.valor}, fornecedor ${l.fornecedor}, solicitante ${l.solicitante}, aprovador ${l.aprovador}`}
      dicaBusca="usuário, fornecedor, descrição..."
      colunas={[
        { chave: 'id', titulo: 'ID' },
        { chave: 'data', titulo: 'Data' },
        { chave: 'solicitante', titulo: 'Solicitante', filtravel: true },
        { chave: 'fornecedor', titulo: 'Forn.', filtravel: true },
        { chave: 'descricao', titulo: 'Descrição' },
        { chave: 'valor', titulo: 'Valor' },
        { chave: 'aprovador', titulo: 'Aprovador', filtravel: true },
        { chave: 'status', titulo: 'Status' },
      ]}
    />
  )
}
