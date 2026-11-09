import { Mail, Search, Pin, BookOpen, ClipboardCheck, Play } from 'lucide-react'
import { useGame } from '../GameContext'
import { tocar } from '../som/efeitos'

// Fase com tutorial: explica o jogo. Fases seguintes: só o briefing da fase.
export default function Intro() {
  const { caso, intro, setIntro, abrir } = useGame()
  if (!intro) return null

  function comecar() {
    setIntro(false)
    tocar('inicio')
    // Chega um e-mail novo. Na fase tutorial, o jogador abre sozinho (o ícone fica piscando).
    setTimeout(() => tocar('email'), 700)
    if (!caso.tutorial) abrir('mensagens')
  }

  if (!caso.tutorial) {
    return (
      <div className="intro-fundo">
        <div className="intro">
          <div className="intro-corpo">
            <span className="selo">Nova fase</span>
            <h2>{caso.titulo}</h2>
            <p>{caso.resumoInicial}</p>
            <p className="base-livro"><b>Base no livro:</b> {caso.baseLivro}</p>
            <p className="intro-dica">
              Sem missões e sem dicas. Use tudo que aprendeu: <b>leia</b> o e-mail, <b>cruze</b> as tabelas,
              <b> fixe</b> as provas, compare com as <b>normas</b> e <b>entregue</b> o relatório.
            </p>
            <button className="btn-grande primario" onClick={comecar}><Play size={16} /> Iniciar fase</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="intro-fundo">
      <div className="intro">
        <div className="intro-corpo">
          <span className="selo">Bem-vindo(a)</span>
          <h2>Você é auditor(a) na {caso.empresa}</h2>
          <p>
            Neste jogo você vai conhecer a <strong>revisão externa de qualidade pelos pares</strong>: o processo em que
            um auditor independente examina o trabalho de outro, para acompanhar e controlar a qualidade da auditoria.
            Todo o conteúdo vem do livro <em>Auditoria Contábil</em> (Crepaldi, 2025), capítulo 4, seção 4.9.
          </p>
          <p className="base-livro"><b>Base no livro:</b> {caso.baseLivro}</p>
          <ol className="passos">
            <li><Mail size={18} /><span><b>Leia</b> o e-mail com o pedido do Ricardo, nas Mensagens.</span></li>
            <li><Search size={18} /><span><b>Investigue</b> os quadros e documentos da área de trabalho.</span></li>
            <li><Pin size={18} /><span><b>Fixe</b> as linhas importantes: elas viram suas evidências no Caderno.</span></li>
            <li><BookOpen size={18} /><span><b>Compare</b> com a Biblioteca de Normas (trechos do livro, com a página).</span></li>
            <li><ClipboardCheck size={18} /><span><b>Entregue</b> o Relatório de Auditoria e receba sua nota.</span></li>
          </ol>
          <p className="intro-dica">
            O painel <b>Missão do auditor</b>, no canto direito, vai te guiar passo a passo. O ícone da próxima
            ação fica piscando. Sem pressa, sem punição: você pode errar e tentar de novo.
          </p>
          <button className="btn-grande primario" onClick={comecar}><Play size={16} /> Começar auditoria</button>
        </div>
      </div>
    </div>
  )
}
