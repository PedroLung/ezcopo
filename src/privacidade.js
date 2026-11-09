// Informações da política de privacidade. Ajuste pelo .env.local (veja .env.example), sem mexer no código.
// Sempre que o texto da política mudar de forma importante, aumente POLITICA_VERSAO:
// ela é gravada junto com o aceite de cada aluno.

export const POLITICA_VERSAO = '2026-11'

// Quem responde por dúvidas sobre dados pessoais
export const CONTATO =
  import.meta.env.VITE_CONTATO_PRIVACIDADE || 'a professora responsável pela disciplina'

// Por quanto tempo os dados ficam guardados
export const PRAZO =
  import.meta.env.VITE_PRAZO_DADOS || 'até o fim do semestre letivo em que o jogo for usado'
