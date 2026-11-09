// FASE 2 - "Calendário, prazos e nova revisão" (SOLO)
// Fonte: CREPALDI, 2025, cap. 4, seção 4.9:
//  4.9.2 (p. 143-144): ciclo de 4 anos, seleção em janeiro, ano-base, nova revisão no ano subsequente
//  4.9.8 (p. 148): relatório do revisor em até 45 dias
//  4.9.9 (p. 149): plano de ação em até 30 dias
//  4.9.10 e 4.9.11 (p. 149): indicação automática, revisor impedido, recurso em 15 dias
import { normasLivro } from './livro'

export const fase2 = {
  id: 'fase2',
  titulo: 'Fase 2 - Calendário, prazos e nova revisão',
  empresa: 'Menezes & Associados Auditores Independentes',
  tutorial: false,
  baseLivro: 'CREPALDI (2025), seção 4.9: itens 4.9.2 (p. 143 e 144), 4.9.8 e 4.9.9 (p. 148 e 149), 4.9.10 e 4.9.11 (p. 149).',
  apps: ['mensagens', 'auditores', 'prazos', 'normas', 'caderno', 'relatorio'],

  resumoInicial:
    'Janeiro de 2026, ano-base 2025. O CRE vai selecionar quem será revisado no ano, e há um processo com vários prazos. ' +
    'Descubra quem entra obrigatoriamente e quais prazos foram descumpridos. Sem guia desta vez: use a Biblioteca de Normas.',

  mensagens: [
    {
      id: 'm1',
      de: 'Ricardo Menezes (Sócio-diretor)',
      assunto: 'Programa de revisão de 2026 e prazos',
      data: '12/01/2026, 09:15',
      texto:
        'Olá, auditor(a),\n\n' +
        'Estamos em janeiro, e é nessa época que o CRE seleciona quem vai ser revisado. ' +
        'Peguei o quadro com o histórico de cada auditor e também o registro dos prazos de um processo em andamento.\n\n' +
        'Quero saber quem entra obrigatoriamente no programa deste ano e por quê, e quais prazos foram descumpridos. ' +
        'Cuidado: tem gente que parece que entra, e prazo que parece estourado, mas a norma não diz isso. Quero tudo baseado na norma.\n\n' +
        'Abraço,\nRicardo Menezes',
    },
  ],

  missoes: [],

  tabelas: {
    auditores: {
      titulo: 'Quadro de Auditores (ano-base 2025)',
      tipo: 'aud',
      largura: 900,
      ajuda: '',
      dicaBusca: 'nome, tipo de relatório...',
      colunas: [
        { chave: 'id', titulo: 'ID' },
        { chave: 'nome', titulo: 'Auditor' },
        { chave: 'cadastro', titulo: 'Cadastro na CVM' },
        { chave: 'parecer', titulo: 'Relatório de revisão (2025)', filtravel: true },
        { chave: 'aprov', titulo: 'Relatório e plano aprovados pelo CRE?' },
      ],
      resumo: (l) => `${l.id} ${l.nome}: cadastro CVM ${l.cadastro}, relatório "${l.parecer}", aprovados pelo CRE: ${l.aprov}`,
      linhas: [
        { id: 'A01', nome: 'Delta Auditores', cadastro: '2025', parecer: '-', aprov: '-' },
        { id: 'A02', nome: 'Prisma Auditores', cadastro: '2012', parecer: 'Opinião adversa', aprov: 'Sim' },
        { id: 'A03', nome: 'Souza & Lima Auditoria', cadastro: '2017', parecer: 'Abstenção de opinião', aprov: 'Sim' },
        { id: 'A04', nome: 'Aurora Auditores', cadastro: '2014', parecer: 'Sem ressalvas', aprov: 'Não (plano de ação)' },
        { id: 'A05', nome: 'Marcos Tavares', cadastro: '2019', parecer: 'Com ressalvas', aprov: 'Sim' },
        { id: 'A06', nome: 'Menezes & Associados (nossa firma)', cadastro: '2010', parecer: 'Sem ressalvas', aprov: 'Sim' },
        { id: 'A07', nome: 'Helena Duarte', cadastro: '2024', parecer: '-', aprov: '-' },
      ],
    },

    prazos: {
      titulo: 'Registro de Atos e Prazos',
      tipo: 'prz',
      largura: 900,
      ajuda: '',
      dicaBusca: 'revisor, plano, recurso...',
      colunas: [
        { chave: 'id', titulo: 'ID' },
        { chave: 'ato', titulo: 'Ato ou prazo registrado' },
      ],
      resumo: (l) => `Prazo ${l.id}: "${l.ato}"`,
      linhas: [
        { id: 'P1', ato: 'O relatório do auditor-revisor saiu 60 dias após a finalização da revisão em campo.' },
        { id: 'P2', ato: 'O relatório do auditor-revisor saiu 30 dias após a finalização da revisão em campo.' },
        { id: 'P3', ato: 'O auditor-revisado entregou o plano de ação 50 dias após receber o relatório.' },
        { id: 'P4', ato: 'O auditor-revisado entregou o plano de ação 20 dias após receber o relatório.' },
        { id: 'P5', ato: 'O auditor-revisado recorreu ao Tribunal Superior de Ética e Disciplina do CFC 25 dias após ser notificado da decisão do CRE.' },
        { id: 'P6', ato: 'O auditor-revisado recorreu ao Tribunal Superior de Ética e Disciplina do CFC 10 dias após ser notificado da decisão do CRE.' },
        { id: 'P7', ato: 'O auditor-revisor descumpriu os prazos e foi autorizado a atuar como revisor no ano seguinte.' },
        { id: 'P8', ato: 'O auditor-revisado não contratou revisor e ficou automaticamente indicado para a revisão no ano seguinte.' },
      ],
    },
  },

  normas: normasLivro.filter((n) => ['4.9.2-b', '4.9.2-d', '4.9.2-e', '4.9.8-9', '4.9.10-11'].includes(n.id)),

  relatorio: {
    campos: [
      {
        id: 'obrigatorios', tipo: 'evidencias', filtro: 'aud', peso: 25,
        titulo: 'Quem entra obrigatoriamente no programa de 2026?',
        ajuda: 'Marque, entre os auditores que você fixou, só os que a norma obriga a revisar. Marcar quem não é obrigatório tira nota.',
        correto: ['aud:A01', 'aud:A02', 'aud:A03', 'aud:A04'],
        minimo: 4,
        explicacao:
          'A01 (cadastro na CVM no ano anterior, 2025), A02 (opinião adversa), A03 (abstenção de opinião) e A04 (plano de ação não aprovado pelo CRE). ' +
          'A05 (só ressalvas), A06 (nossa firma) e A07 (cadastro em 2024) não são obrigatórios.',
        ref: 'p. 143 e 144 (4.9.2)',
      },
      {
        id: 'ciclo', tipo: 'select', peso: 5,
        titulo: 'Qual é a frequência mínima da revisão?',
        ajuda: 'Veja o ciclo na norma.',
        opcoes: [
          { id: '1', label: 'Uma vez por ano' },
          { id: '4', label: 'No mínimo uma vez a cada ciclo de quatro anos' },
          { id: '10', label: 'Uma vez a cada dez anos' },
        ],
        correto: '4',
        explicacao: 'Cada auditor é revisado, no mínimo, uma vez a cada ciclo de quatro anos.',
        ref: 'p. 143 (4.9.2)',
      },
      {
        id: 'gatilhos', tipo: 'multi', peso: 15,
        titulo: 'Quais situações levam a nova revisão no ano seguinte?',
        ajuda: 'Marque as que a norma prevê. Marcar situações que não estão na norma tira nota.',
        opcoes: [
          { id: 'adversa', label: 'Relatório com opinião adversa ou abstenção de opinião' },
          { id: 'naoaprov', label: 'Relatório e/ou plano de ação não aprovados pelo CRE' },
          { id: 'ressalvas', label: 'Relatório com ressalvas' },
        ],
        correto: ['adversa', 'naoaprov'],
        explicacao: 'São duas: opinião adversa ou abstenção de opinião; e relatório e/ou plano de ação não aprovados pelo CRE. Ressalvas não estão na lista.',
        ref: 'p. 144 (4.9.2)',
      },
      {
        id: 'irregulares', tipo: 'evidencias', filtro: 'prz', peso: 35,
        titulo: 'Quais atos e prazos do registro estão irregulares?',
        ajuda: 'Marque, entre os que você fixou, só os que contrariam a norma. Marcar registros corretos tira nota.',
        correto: ['prz:P1', 'prz:P3', 'prz:P5', 'prz:P7'],
        minimo: 4,
        explicacao:
          'Irregulares: P1 (o relatório sai em até 45 dias), P3 (o plano de ação sai em até 30 dias), P5 (o recurso é em até 15 dias) e P7 (o revisor que descumpre prazos fica impedido no ano seguinte).',
        ref: 'p. 148 e 149 (4.9.8 a 4.9.11)',
      },
      {
        id: 'prazoRelatorio', tipo: 'select', peso: 10,
        titulo: 'Qual é o prazo máximo do revisor para emitir o relatório?',
        ajuda: 'Conta a partir da finalização da revisão em campo.',
        opcoes: [
          { id: '15', label: '15 dias' },
          { id: '45', label: '45 dias' },
          { id: '60', label: '60 dias' },
        ],
        correto: '45',
        explicacao: 'O relatório deve sair em até 45 dias após a finalização da revisão em campo.',
        ref: 'p. 148 (4.9.8)',
      },
      {
        id: 'recurso', tipo: 'select', peso: 10,
        titulo: 'Das decisões do CRE cabe recurso a quem e em quanto tempo?',
        ajuda: 'Veja o item sobre recurso.',
        opcoes: [
          { id: 'tsed15', label: 'Ao Tribunal Superior de Ética e Disciplina do CFC, em 15 dias' },
          { id: 'cvm15', label: 'À CVM, em 15 dias' },
          { id: 'tsed30', label: 'Ao Tribunal Superior de Ética e Disciplina do CFC, em 30 dias' },
        ],
        correto: 'tsed15',
        explicacao: 'Cabe recurso ao Tribunal Superior de Ética e Disciplina do CFC, em 15 dias após a notificação.',
        ref: 'p. 149 (4.9.11)',
      },
    ],
  },

  referencias: [
    { pagina: 'p. 143 e 144', item: '4.9.2', uso: 'Ciclo de quatro anos, seleção em janeiro, cadastro na CVM no ano anterior e nova revisão no ano seguinte' },
    { pagina: 'p. 148', item: '4.9.8', uso: 'Relatório do revisor em até 45 dias' },
    { pagina: 'p. 149', item: '4.9.9 a 4.9.11', uso: 'Plano de ação em 30 dias, indicação automática, revisor impedido e recurso em 15 dias' },
  ],

  debriefing:
    'Entram obrigatoriamente: Delta (cadastro na CVM em 2025, o ano-base), Prisma (opinião adversa), Souza & Lima (abstenção de opinião) e Aurora (plano de ação não aprovado pelo CRE). ' +
    'Não entram por obrigação: Marcos Tavares (só ressalvas), a nossa firma e Helena Duarte (cadastro em 2024). ' +
    'Prazos irregulares: P1 (relatório em até 45 dias), P3 (plano de ação em até 30 dias), P5 (recurso em 15 dias) e P7 (revisor que descumpre prazos fica impedido no ano seguinte).',
}
