import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

export default function Folha() {
  const { caso } = useGame()
  return (
    <Tabela
      tipo="folha"
      linhas={caso.folha}
      pegarId={(l) => l.id}
      resumo={(l) => `Folha ${l.id} (${l.data}): ${l.func}, de ${l.anterior} para ${l.atual}, alterado por ${l.alteradoPor}, chamado: ${l.chamado}`}
      dicaBusca="funcionário, usuário, chamado..."
      colunas={[
        { chave: 'id', titulo: 'ID' },
        { chave: 'func', titulo: 'Funcionário' },
        { chave: 'anterior', titulo: 'Salário anterior' },
        { chave: 'atual', titulo: 'Salário atual' },
        { chave: 'data', titulo: 'Alterado em' },
        { chave: 'alteradoPor', titulo: 'Alterado por', filtravel: true },
        { chave: 'chamado', titulo: 'Chamado' },
      ]}
    />
  )
}
