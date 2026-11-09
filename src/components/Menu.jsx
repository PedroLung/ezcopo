import {
  Play, Trophy, ClipboardList, CircleHelp, BookOpen, LogOut, User, ArrowLeft,
  Mail, Search, Pin, ClipboardCheck, TriangleAlert, ListChecks, Lock, CircleCheck, RotateCcw,
} from 'lucide-react'
import { useGame } from '../GameContext'
import { useAuth } from '../AuthContext'
import { CASOS } from '../cases'
import FormAuth from './FormAuth'
import Ranking from './Ranking'
import Professor from './Professor'
import { problemaConfig } from '../supabase'

const LARGURA = { null: 460, auth: 440, fases: 540, como: 520, livro: 560, ranking: 520, professor: 920 }

function Voltar({ onClick }) {
  return <button className="voltar" onClick={onClick}><ArrowLeft size={15} /> Voltar</button>
}

// Tela inicial: conta (nick, e-mail e senha), Jogar, Ranking, Painel da professora, Como jogar, Base no livro.
export default function Menu() {
  const { caso, setTela, notas, painelMenu: painel, setPainelMenu: setPainel, faseLiberada, irParaFase } = useGame()
  const { configurado, usuario, carregando, sair } = useAuth()
  const jogou = Object.keys(notas).length > 0
  const professor = usuario?.role === 'professor'

  function jogar() {
    if (configurado && !usuario) setPainel('auth')
    else setTela('jogo')
  }

  function abrirFases() {
    if (configurado && !usuario) setPainel('auth')
    else setPainel('fases')
  }

  return (
    <div className="desktop menu-tela">
      <div className="menu-janela" style={{ width: LARGURA[painel] ?? 460 }}>
        <div className="menu-corpo">
          <img className="menu-logo-img" src={`${import.meta.env.BASE_URL}logo.png`} alt="Ezcopo" />
          <p className="menu-sub">Simulador de auditoria<br />Revisão externa de qualidade pelos pares</p>

          {!configurado && (
            <p className="msg-aviso">
              <TriangleAlert size={16} />
              <span>
                {problemaConfig ||
                  'Banco de dados não configurado: o jogo roda como visitante e as notas não são salvas. (Veja o arquivo .env.local.)'}
              </span>
            </p>
          )}

          {painel === null && carregando && <p className="menu-sub">Carregando...</p>}

          {painel === null && !carregando && (
            <>
              {usuario && (
                <>
                  <p className="saudacao">
                    <User size={16} /> Olá, <b>{usuario.nick}</b>{professor ? ' (professor)' : ''}
                  </p>
                  <p className="saudacao-fase">Você está na: <b>{caso.titulo}</b></p>
                </>
              )}
              <div className="menu-botoes">
                <button className="btn-grande primario" onClick={jogar}>
                  <Play size={17} /> {usuario ? (jogou ? 'Continuar' : 'Jogar') : configurado ? 'Entrar para jogar' : 'Jogar'}
                </button>
                {(usuario || !configurado) && <button onClick={abrirFases}><ListChecks size={16} /> Escolher fase</button>}
                {usuario && <button onClick={() => setPainel('ranking')}><Trophy size={16} /> Ranking</button>}
                {professor && <button onClick={() => setPainel('professor')}><ClipboardList size={16} /> Painel da professora</button>}
                <button onClick={() => setPainel('como')}><CircleHelp size={16} /> Como jogar</button>
                <button onClick={() => setPainel('livro')}><BookOpen size={16} /> Base no livro</button>
                {usuario && <button className="discreto" onClick={sair}><LogOut size={15} /> Sair da conta</button>}
              </div>
            </>
          )}

          {painel === 'auth' && (
            <div className="menu-painel">
              <h3>Entre para jogar</h3>
              <FormAuth onSucesso={() => setPainel(null)} />
              <Voltar onClick={() => setPainel(null)} />
            </div>
          )}

          {painel === 'fases' && (
            <div className="menu-painel">
              <h3><ListChecks size={18} /> Escolher fase</h3>
              <p className="menu-sub">Complete uma fase para liberar a próxima. As fases concluídas podem ser refeitas para melhorar a nota.</p>
              <ul className="fases-lista">
                {CASOS.map((c, i) => {
                  const feita = notas[c.id] !== undefined
                  const liberada = faseLiberada(i)
                  return (
                    <li key={c.id} className={!liberada ? 'fase-card bloqueada' : feita ? 'fase-card feita' : 'fase-card'}>
                      <span className="fase-icone">
                        {!liberada ? <Lock size={18} /> : feita ? <CircleCheck size={18} /> : <b>{i + 1}</b>}
                      </span>
                      <div className="fase-info">
                        <div className="fase-titulo">{c.titulo}</div>
                        <div className="fase-sub">
                          {!liberada
                            ? `Conclua a Fase ${i} para liberar`
                            : feita
                              ? `Melhor nota: ${notas[c.id]}/100`
                              : c.tutorial ? 'Tutorial guiado' : 'Ainda não feita'}
                        </div>
                      </div>
                      {liberada && (
                        <button className={feita ? '' : 'primario'} onClick={() => irParaFase(i)}>
                          {feita ? <><RotateCcw size={14} /> Refazer</> : <><Play size={14} /> Jogar</>}
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
              <Voltar onClick={() => setPainel(null)} />
            </div>
          )}

          {painel === 'ranking' && (
            <div className="menu-painel">
              <h3><Trophy size={18} /> Ranking</h3>
              <Ranking />
              <Voltar onClick={() => setPainel(null)} />
            </div>
          )}

          {painel === 'professor' && (
            <div className="menu-painel">
              <h3><ClipboardList size={18} /> Notas dos alunos</h3>
              <Professor />
              <Voltar onClick={() => setPainel(null)} />
            </div>
          )}

          {painel === 'como' && (
            <div className="menu-painel">
              <h3>Como jogar</h3>
              <ol className="passos">
                <li><Mail size={18} /><span><b>Leia</b> o e-mail do Ricardo nas Mensagens.</span></li>
                <li><Search size={18} /><span><b>Investigue</b> os quadros da área de trabalho.</span></li>
                <li><Pin size={18} /><span><b>Fixe</b> as linhas importantes: elas viram evidências no Caderno.</span></li>
                <li><BookOpen size={18} /><span><b>Compare</b> com a Biblioteca de Normas (resumos do livro, com a página).</span></li>
                <li><ClipboardCheck size={18} /><span><b>Entregue</b> o Relatório de Auditoria e veja sua nota.</span></li>
              </ol>
              <p>São {CASOS.length} fases. A primeira é um tutorial guiado; as outras você faz sozinho(a). Sua melhor nota de cada fase entra no ranking.</p>
              <Voltar onClick={() => setPainel(null)} />
            </div>
          )}

          {painel === 'livro' && (
            <div className="menu-painel">
              <h3>Base no livro</h3>
              <p>
                Todo o conteúdo do jogo vem de um único livro: CREPALDI, Silvio Aparecido.
                <i> Auditoria contábil: ferramenta de controle e informação</i>. Uberlândia: [s.n.], 2025.
                Capítulo 4, seção 4.9 (revisão externa de qualidade pelos pares), p. 142 a 149.
              </p>
              <ul>
                {CASOS.map((c) => <li key={c.id}><b>{c.titulo}:</b> {c.baseLivro}</li>)}
              </ul>
              <Voltar onClick={() => setPainel(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
