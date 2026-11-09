import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

// App de tabela genérico: a configuração vem de caso.tabelas[appId].
export default function TabelaCaso({ appId }) {
  const { caso } = useGame()
  const cfg = caso.tabelas[appId]
  return (
    <Tabela
      tipo={cfg.tipo}
      linhas={cfg.linhas}
      colunas={cfg.colunas}
      pegarId={(l) => l.id}
      resumo={cfg.resumo}
      dicaBusca={cfg.dicaBusca}
    />
  )
}
