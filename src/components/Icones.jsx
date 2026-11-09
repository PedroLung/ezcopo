import {
  MessageSquareText,
  FileText,
  Users,
  CalendarClock,
  Gavel,
  BookOpen,
  NotebookPen,
  ClipboardCheck,
} from 'lucide-react'

// Ícone de cada aplicativo: símbolo da biblioteca Lucide dentro de um quadradinho colorido.
// Para um app novo, adicione uma linha aqui (símbolo + cor do fundo e do traço).
const APPS = {
  mensagens: { Simbolo: MessageSquareText, fg: '#b85d3f', bg: '#fbe4d9' },
  memorando: { Simbolo: FileText, fg: '#a67c10', bg: '#fcefc9' },
  auditores: { Simbolo: Users, fg: '#4a7a58', bg: '#e1eee5' },
  prazos: { Simbolo: CalendarClock, fg: '#46699a', bg: '#e2ecf7' },
  atos: { Simbolo: Gavel, fg: '#7a559e', bg: '#ece1f4' },
  normas: { Simbolo: BookOpen, fg: '#9c4d36', bg: '#f5e0d6' },
  caderno: { Simbolo: NotebookPen, fg: '#ab4a69', bg: '#f8e2ea' },
  relatorio: { Simbolo: ClipboardCheck, fg: '#3b7855', bg: '#dff0e6' },
}

export default function Icone({ nome, tamanho = 32 }) {
  const { Simbolo, fg, bg } = APPS[nome] || { Simbolo: FileText, fg: '#6b6159', bg: '#ece5da' }
  return (
    <span
      className="tile"
      style={{ width: tamanho, height: tamanho, borderRadius: Math.round(tamanho * 0.3), background: bg, color: fg }}
      aria-hidden="true"
    >
      <Simbolo size={Math.round(tamanho * 0.56)} strokeWidth={1.9} />
    </span>
  )
}
