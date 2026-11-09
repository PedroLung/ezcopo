// FASE 1 - "Quem é quem na revisão pelos pares" (TUTORIAL)
// Fonte: CREPALDI, 2025, cap. 4, seção 4.9, itens 4.9.1 e 4.9.2, p. 142-143.
import { normasLivro } from './livro'

export const fase1 = {
  id: 'fase1',
  titulo: 'Fase 1 - Quem é quem na revisão pelos pares',
  empresa: 'Menezes & Associados Auditores Independentes',
  tutorial: true,
  baseLivro: 'CREPALDI (2025), seção 4.9, itens 4.9.1 e 4.9.2, p. 142 e 143.',
  apps: ['mensagens', 'memorando', 'normas', 'caderno', 'relatorio'],

  mensagens: [
    {
      id: 'm1',
      de: 'Ricardo Menezes (Sócio-diretor)',
      assunto: 'Memorando do estagiário sobre a revisão pelos pares',
      data: '08/01/2026, 08:42',
      texto:
        'Olá, auditor(a),\n\n' +
        'Nossa firma foi chamada para participar do programa de revisão pelos pares. ' +
        'O estagiário montou um memorando explicando quem faz o quê nesse processo, mas eu desconfio que ele embolou algumas coisas.\n\n' +
        'Confira o memorando com a norma, me diga quem realmente faz cada etapa e aponte tudo o que está errado. ' +
        'Quero entender isso direito antes de falar com o CRE.\n\n' +
        'Abraço,\nRicardo Menezes',
    },
  ],

  missoes: [
    {
      id: 'ler',
      titulo: 'Leia o e-mail do Ricardo',
      app: 'mensagens',
      detalhe: 'Chegou um e-mail novo. Abra as Mensagens e leia o pedido do seu chefe.',
      dica: 'Clique no ícone piscando (o que tem a bolinha vermelha).',
      feito: (e) => e.abriu('mensagens'),
    },
    {
      id: 'normas',
      titulo: 'Leia a Biblioteca de Normas',
      app: 'normas',
      detalhe: 'São resumos curtos do livro, cada um com a página. Abra os itens: é com eles que você confere o memorando.',
      dica: 'Veja quem faz o quê: CRE, auditor-revisor e auditor-revisado.',
      feito: (e) => e.abriu('normas'),
    },
    {
      id: 'memorando',
      titulo: 'Ache as afirmações erradas do memorando',
      app: 'memorando',
      detalhe: 'Compare cada afirmação com a norma e use "+ Fixar" nas que estão erradas.',
      dica: 'São quatro afirmações erradas.',
      feito: (e) => ['memo:M2', 'memo:M3', 'memo:M5', 'memo:M7'].every((id) => e.fixou(id)),
    },
    {
      id: 'relatorio',
      titulo: 'Entregue o Relatório de Auditoria',
      app: 'relatorio',
      detalhe: 'Responda as 5 perguntas. Suas provas do Caderno aparecem para você marcar.',
      dica: 'Use a Biblioteca de Normas para responder.',
      feito: (e) => e.entregue,
    },
  ],

  tabelas: {
    memorando: {
      titulo: 'Memorando do estagiário',
      tipo: 'memo',
      largura: 760,
      ajuda: 'Rascunho do estagiário sobre a revisão pelos pares. Nem tudo está certo: compare com a Biblioteca de Normas e fixe o que estiver errado.',
      dicaBusca: 'CRE, revisor, plano...',
      colunas: [
        { chave: 'id', titulo: 'ID' },
        { chave: 'afirmacao', titulo: 'Afirmação do memorando' },
      ],
      resumo: (l) => `Memorando ${l.id}: "${l.afirmacao}"`,
      linhas: [
        { id: 'M1', afirmacao: 'O CRE administra o programa de revisão.' },
        { id: 'M2', afirmacao: 'O auditor-revisado é quem realiza a revisão individual.' },
        { id: 'M3', afirmacao: 'O auditor-revisor elabora o plano de ação.' },
        { id: 'M4', afirmacao: 'O auditor-revisor elabora o relatório de revisão e o apresenta ao CRE.' },
        { id: 'M5', afirmacao: 'A revisão pelos pares é feita pelo CFC sozinho, sem outro auditor independente.' },
        { id: 'M6', afirmacao: 'O auditor-revisado é a firma ou o auditor que será revisado.' },
        { id: 'M7', afirmacao: 'O ano-base é sempre o ano posterior ao da indicação do auditor.' },
        { id: 'M8', afirmacao: 'A qualidade é medida pelo cumprimento das Normas Brasileiras de Contabilidade do CFC.' },
      ],
    },
  },

  normas: normasLivro.filter((n) => ['4.9.1', '4.9.2-a', '4.9.2-b'].includes(n.id)),

  relatorio: {
    campos: [
      {
        id: 'administra', tipo: 'select', peso: 15,
        titulo: 'Quem administra o programa de revisão?',
        ajuda: 'Escolha a parte responsável.',
        opcoes: [
          { id: 'cre', label: 'CRE' },
          { id: 'revisor', label: 'Auditor-revisor' },
          { id: 'revisado', label: 'Auditor-revisado' },
        ],
        correto: 'cre',
        explicacao: 'O CRE administra o programa de revisão.',
        ref: 'p. 143 (4.9.2)',
      },
      {
        id: 'revisa', tipo: 'select', peso: 15,
        titulo: 'Quem realiza a revisão individual?',
        ajuda: 'Quem examina o trabalho do outro auditor?',
        opcoes: [
          { id: 'cre', label: 'CRE' },
          { id: 'revisor', label: 'Auditor-revisor' },
          { id: 'revisado', label: 'Auditor-revisado' },
        ],
        correto: 'revisor',
        explicacao: 'O auditor-revisor é o responsável pela revisão individual.',
        ref: 'p. 143 (4.9.2)',
      },
      {
        id: 'plano', tipo: 'select', peso: 15,
        titulo: 'Quem elabora o plano de ação?',
        ajuda: 'O plano responde às fragilidades do relatório de revisão.',
        opcoes: [
          { id: 'revisor', label: 'Auditor-revisor' },
          { id: 'revisado', label: 'Auditor-revisado' },
          { id: 'cre', label: 'CRE' },
        ],
        correto: 'revisado',
        explicacao: 'O plano de ação é elaborado pelo auditor-revisado e apresentado ao CRE.',
        ref: 'p. 143 (4.9.2)',
      },
      {
        id: 'objetivo', tipo: 'select', peso: 15,
        titulo: 'Qual é o objetivo da revisão pelos pares?',
        ajuda: 'Veja o item 4.9.1.',
        opcoes: [
          { id: 'acompanhamento', label: 'Acompanhar e controlar a qualidade dos trabalhos dos auditores independentes' },
          { id: 'lucro', label: 'Avaliar a lucratividade das empresas clientes' },
          { id: 'contratar', label: 'Escolher qual auditor cada empresa contrata' },
        ],
        correto: 'acompanhamento',
        explicacao: 'É um processo de acompanhamento e controle de qualidade dos trabalhos dos auditores independentes.',
        ref: 'p. 142 (4.9.1)',
      },
      {
        id: 'provas', tipo: 'evidencias', peso: 40,
        titulo: 'Quais afirmações do memorando estão erradas?',
        ajuda: 'Marque, entre as que você fixou, as que contrariam a norma. Marcar afirmações corretas tira nota.',
        correto: ['memo:M2', 'memo:M3', 'memo:M5', 'memo:M7'],
        minimo: 4,
        explicacao:
          'Erradas: M2 (a revisão individual é do auditor-revisor), M3 (o plano de ação é do auditor-revisado), M5 (a revisão é feita por outro auditor independente) e M7 (o ano-base pode ser o ano anterior à indicação).',
        ref: 'p. 142 e 143 (4.9.2)',
      },
    ],
  },

  referencias: [
    { pagina: 'p. 142', item: '4.9.1 e 4.9.2', uso: 'Objetivo e definição da revisão pelos pares' },
    { pagina: 'p. 143', item: '4.9.2', uso: 'Partes (CRE, revisor, revisado), relatório de revisão, plano de ação e ano-base' },
  ],

  debriefing:
    'O CRE administra o programa; o auditor-revisor faz a revisão e elabora o relatório; o auditor-revisado responde com o plano de ação. ' +
    'O estagiário trocou papéis (M2 e M3), disse que o CFC faz a revisão sozinho (M5) e errou o ano-base (M7). As demais afirmações estavam corretas.',
}
