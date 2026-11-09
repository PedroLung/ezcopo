import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

export default function Funcionarios() {
  const { caso } = useGame()
  const colunas = [
    { chave: 'id', titulo: 'ID' },
    { chave: 'nome', titulo: 'Nome' },
    { chave: 'setor', titulo: 'Setor' },
    { chave: 'cargo', titulo: 'Cargo' },
    { chave: 'admissao', titulo: 'Admissão' },
    { chave: 'desligamento', titulo: 'Desligamento' },
  ]
  // Alguns casos têm telefone no cadastro do RH
  if (caso.funcionarios[0].telefone) colunas.push({ chave: 'telefone', titulo: 'Telefone', filtravel: true })

  return (
    <Tabela
      tipo="func"
      linhas={caso.funcionarios}
      pegarId={(l) => l.id}
      resumo={(l) => `RH: ${l.nome} (${l.setor}, ${l.cargo}), desligamento: ${l.desligamento}${l.telefone ? `, tel. ${l.telefone}` : ''}`}
      colunas={colunas}
    />
  )
}
