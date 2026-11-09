import { useGame } from '../GameContext'
import Tabela from '../components/Tabela'

export default function Logs() {
  const { caso } = useGame()
  return (
    <Tabela
      tipo="log"
      linhas={caso.logs}
      pegarId={(l) => l.id}
      resumo={(l) => `[${l.ts}] ${l.usuario} @ ${l.ip}: ${l.acao} - ${l.recurso} (${l.resultado})`}
      dicaBusca="usuário, IP, ação..."
      colunas={[
        { chave: 'id', titulo: 'ID' },
        { chave: 'ts', titulo: 'Data/Hora' },
        { chave: 'usuario', titulo: 'Usuário', filtravel: true },
        { chave: 'ip', titulo: 'IP', filtravel: true },
        { chave: 'acao', titulo: 'Ação', filtravel: true },
        { chave: 'recurso', titulo: 'Recurso' },
        { chave: 'resultado', titulo: 'Resultado', badge: true },
      ]}
    />
  )
}
