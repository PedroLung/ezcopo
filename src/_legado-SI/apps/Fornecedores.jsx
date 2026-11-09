import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

export default function Fornecedores() {
  const { caso } = useGame()
  return (
    <Tabela
      tipo="forn"
      linhas={caso.fornecedores}
      pegarId={(l) => l.id}
      resumo={(l) => `Fornecedor ${l.id} ${l.razao}, tel. ${l.telefone}, cadastrado em ${l.cadastro} por ${l.cadastradoPor}`}
      dicaBusca="nome, telefone, cadastrante..."
      colunas={[
        { chave: 'id', titulo: 'ID' },
        { chave: 'razao', titulo: 'Razão social' },
        { chave: 'cnpj', titulo: 'CNPJ' },
        { chave: 'endereco', titulo: 'Endereço' },
        { chave: 'telefone', titulo: 'Telefone', filtravel: true },
        { chave: 'cadastro', titulo: 'Cadastro' },
        { chave: 'cadastradoPor', titulo: 'Cadastrado por', filtravel: true },
      ]}
    />
  )
}
