import { useEffect, useState } from 'react'
import { LayoutGrid, CircleHelp, Flag, User, Pin } from 'lucide-react'
import { useGame } from './GameContext'
import { useAuth } from './AuthContext'
import Janela from './components/Janela'
import Icone from './components/Icones'
import PainelMissoes from './components/PainelMissoes'
import Intro from './components/Intro'
import ResumoFinal from './components/ResumoFinal'
import Menu from './components/Menu'
import Mensagens from './apps/Mensagens'
import Normas from './apps/Normas'
import Caderno from './apps/Caderno'
import Relatorio from './apps/Relatorio'
import TabelaCaso from './apps/TabelaCaso'

// Apps fixos (todas as fases têm). Os apps de tabela vêm de caso.tabelas.
// "ajuda" só aparece em fases com tutorial: true.
const APPS_FIXOS = {
  mensagens: {
    titulo: 'Mensagens', Comp: Mensagens, largura: 560,
    ajuda: 'Sua caixa de entrada. Aqui chegam os e-mails do seu chefe com o que aconteceu e o que você precisa descobrir.',
  },
  normas: {
    titulo: 'Biblioteca de Normas', Comp: Normas, largura: 620,
    ajuda: 'Trechos do livro de Crepaldi sobre a revisão pelos pares, cada um com a página. É com eles que você confere o que está certo ou errado. Clique num item para ler.',
  },
  caderno: {
    titulo: 'Caderno de Evidências', Comp: Caderno, largura: 620,
    ajuda: 'Suas anotações: tudo que você marcou com "+ Fixar" nas tabelas. É daqui que você escolhe as provas do relatório.',
  },
  relatorio: {
    titulo: 'Relatório de Auditoria', Comp: Relatorio, largura: 700,
    ajuda: 'A entrega final. Responda as perguntas com o que você descobriu e receba sua nota com explicação e a página do livro.',
  },
}

const LARGURA_ICONE = 100
const ALTURA_ICONE = 108 // ícone + até 2 linhas de texto + espaçamento
const ALTURA_BARRA = 56
const LARGURA_PAINEL = 340

function Relogio() {
  const [agora, setAgora] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setAgora(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  return <span>{agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
}

export default function App() {
  const { caso, janelas, abrir, focar, minimizar, fixados, missaoAtual, setIntro, setResumoAberto, tela, setTela, abertos, intro } = useGame()
  const { configurado, usuario } = useAuth()

  // Monta a lista de apps da fase, na ordem de caso.apps
  const appsDoCaso = caso.apps.map((id) => {
    if (APPS_FIXOS[id]) return { id, ...APPS_FIXOS[id] }
    const t = caso.tabelas[id]
    return { id, titulo: t.titulo, Comp: TabelaCaso, largura: t.largura || 900, ajuda: t.ajuda }
  })
  const NOMES = Object.fromEntries(appsDoCaso.map((a) => [a.id, a.titulo]))

  // Grade de ícones estilo desktop: preenche a coluna de cima para baixo e continua na coluna ao lado
  const [altura, setAltura] = useState(window.innerHeight)
  useEffect(() => {
    const aoRedimensionar = () => setAltura(window.innerHeight)
    window.addEventListener('resize', aoRedimensionar)
    return () => window.removeEventListener('resize', aoRedimensionar)
  }, [])
  const linhas = Math.max(1, Math.floor((altura - ALTURA_BARRA - 16) / ALTURA_ICONE))
  const colunas = Math.ceil(appsDoCaso.length / linhas)
  const larguraIcones = colunas * LARGURA_ICONE + (colunas - 1) * 6 + 16
  const espaco = window.innerWidth - larguraIcones - (caso.tutorial ? LARGURA_PAINEL : 0) - 24

  // Com o banco configurado, só joga quem estiver logado
  if (tela === 'menu' || (configurado && !usuario)) return <Menu />

  return (
    <div className="desktop">
      <div
        className="icones"
        style={{ gridTemplateRows: `repeat(${linhas}, auto)`, width: larguraIcones }}
      >
        {appsDoCaso.map((a) => (
          <button
            key={a.id}
            className={caso.tutorial && missaoAtual?.app === a.id ? 'icone pisca' : 'icone'}
            data-som="abrir"
            onClick={() => abrir(a.id)}
          >
            <span className="icone-img">
              <Icone nome={a.id} tamanho={52} />
              {a.id === 'mensagens' && !abertos.includes('mensagens') && !intro && <span className="badge-novo" />}
            </span>
            <span className="icone-txt">{a.titulo}</span>
          </button>
        ))}
      </div>

      <div className="marca" style={{ left: larguraIcones + 32 }}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
        <small>{caso.titulo}</small>
      </div>

      {caso.tutorial && <PainelMissoes nomeApps={NOMES} />}

      {janelas.map((j) => {
        const i = appsDoCaso.findIndex((a) => a.id === j.id)
        const app = appsDoCaso[i]
        if (!app || j.minimizada) return null
        return (
          <Janela
            key={`${caso.id}-${j.id}`}
            id={j.id}
            titulo={app.titulo}
            z={j.z}
            ajuda={caso.tutorial ? app.ajuda : null}
            largura={Math.max(360, Math.min(app.largura, espaco))}
            inicial={{ x: larguraIcones + 12 + (i % 4) * 26, y: 14 + (i % 4) * 26 }}
          >
            <app.Comp appId={app.id} />
          </Janela>
        )
      })}

      <div className="barra-tarefas">
        <button className="iniciar" onClick={() => setTela('menu')}><LayoutGrid size={16} /> Menu</button>
        <button onClick={() => setIntro(true)}><CircleHelp size={16} /> Ajuda</button>
        <button onClick={() => setResumoAberto(true)}><Flag size={16} /> Resumo</button>
        <div className="tarefas">
          {janelas.map((j) => (
            <button key={j.id} className={j.minimizada ? '' : 'ativa'} onClick={() => (j.minimizada ? minimizar(j.id) : focar(j.id))}>
              <Icone nome={j.id} tamanho={22} /> {NOMES[j.id]}
            </button>
          ))}
        </div>
        <div className="bandeja">
          {usuario && <span><User size={14} /> {usuario.nick}</span>}
          <span><Pin size={14} /> {fixados.length}</span>
          <Relogio />
        </div>
      </div>

      <Intro />
      <ResumoFinal />
    </div>
  )
}
