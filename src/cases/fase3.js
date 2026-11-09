// FASE 3 - "O processo da revisão" (SOLO)
// Fonte: CREPALDI, 2025, cap. 4, seção 4.9:
//  4.9.2 (p. 144): composição, mandato e atribuições do CRE; ata; carta de recomendação
//  4.9.4 (p. 145): sigilo, independência e revisão recíproca
//  4.9.6 e 4.9.7 (p. 146-147): escopo da revisão
//  4.9.9 (p. 148): tipos de relatório
//  4.9.12 (p. 149): penalidades
import { normasLivro } from './livro'

export const fase3 = {
  id: 'fase3',
  titulo: 'Fase 3 - O processo da revisão',
  empresa: 'Menezes & Associados Auditores Independentes',
  tutorial: false,
  baseLivro: 'CREPALDI (2025), seção 4.9: itens 4.9.2 (p. 144), 4.9.4 (p. 145), 4.9.6 e 4.9.7 (p. 146 e 147), 4.9.8 e 4.9.9 (p. 148 e 149) e 4.9.12 (p. 149).',
  apps: ['mensagens', 'atos', 'normas', 'caderno', 'relatorio'],

  resumoInicial:
    'Um processo de revisão pelos pares foi analisado pelo CRE. O Ricardo quer ter certeza de que o CRE e o auditor-revisor agiram como a norma manda. ' +
    'Há atos corretos e irregulares misturados. Sem guia desta vez: compare cada ato com a Biblioteca de Normas.',

  mensagens: [
    {
      id: 'm1',
      de: 'Ricardo Menezes (Sócio-diretor)',
      assunto: 'Conferir o processo',
      data: '19/01/2026, 14:03',
      texto:
        'Olá, auditor(a),\n\n' +
        'O CRE analisou uma revisão pelos pares e eu preciso responder ao ofício deles. ' +
        'A Camila montou um quadro com os atos do processo.\n\n' +
        'Quero que você confira cada ato com a norma. Alguns estão certos, outros não. ' +
        'Separe o que está de acordo do que está irregular, e me diga qual é a regra correta. ' +
        'Tenha cuidado: nem tudo que parece estranho é irregular. Quero as provas antes de qualquer resposta.\n\n' +
        'Abraço,\nRicardo Menezes',
    },
  ],

  missoes: [],

  tabelas: {
    atos: {
      titulo: 'Atos do processo de revisão',
      tipo: 'ato',
      largura: 900,
      ajuda: '',
      dicaBusca: 'CRE, revisor, ata...',
      colunas: [
        { chave: 'id', titulo: 'ID' },
        { chave: 'ato', titulo: 'Ato registrado' },
        { chave: 'por', titulo: 'Praticado por', filtravel: true },
      ],
      resumo: (l) => `Ato ${l.id} (${l.por}): "${l.ato}"`,
      linhas: [
        { id: 'T1', por: 'CRE', ato: 'O CRE foi composto por quatro representantes do CFC e quatro do Instituto dos Auditores Independentes do Brasil.' },
        { id: 'T2', por: 'CRE', ato: 'Um representante foi nomeado por cinco anos, sem possibilidade de recondução.' },
        { id: 'T3', por: 'CRE', ato: 'A ata da decisão foi enviada diretamente ao Plenário do CFC, sem passar pela Câmara Técnica.' },
        { id: 'T4', por: 'CRE', ato: 'A ata da decisão foi ao Vice-presidente Técnico do CFC, depois à Câmara Técnica e, por fim, ao Plenário para homologação.' },
        { id: 'T5', por: 'Auditor-revisor', ato: 'Havia evidência de que o auditor-revisado descumpriu as políticas de controle de qualidade, e o revisor não elaborou carta de recomendação circunstanciada.' },
        { id: 'T6', por: 'Auditor-revisor', ato: 'Depois do fim da revisão, um membro da equipe revisora divulgou a terceiros informações obtidas nos trabalhos.' },
        { id: 'T7', por: 'Auditor-revisor', ato: 'Dois auditores fizeram revisão recíproca um do outro, sem aprovação do CRE.' },
        { id: 'T8', por: 'Auditor-revisor', ato: 'A revisão incluiu a análise de negócios entre o auditor-revisado e os seus clientes.' },
        { id: 'T9', por: 'Auditor-revisor', ato: 'O auditor-revisor guardou por sete anos toda a documentação da revisão.' },
        { id: 'T10', por: 'Auditor-revisor', ato: 'O auditor-revisor emitiu relatório com abstenção de opinião, acompanhado de carta de recomendações.' },
      ],
    },
  },

  normas: normasLivro.filter((n) => ['4.9.2-e', '4.9.2-f', '4.9.2-h', '4.9.4', '4.9.6-7', '4.9.8-9', '4.9.12'].includes(n.id)),

  relatorio: {
    campos: [
      {
        id: 'composicao', tipo: 'select', peso: 10,
        titulo: 'Como o CRE é composto?',
        ajuda: 'Veja a composição na norma.',
        opcoes: [
          { id: '4x4', label: '4 representantes do CFC e 4 do Instituto dos Auditores Independentes do Brasil' },
          { id: '5x3', label: '5 representantes do CFC e 3 do Instituto dos Auditores Independentes do Brasil' },
          { id: 'cvm', label: '4 representantes da CVM e 4 do CFC' },
        ],
        correto: '4x4',
        explicacao: 'O CRE é composto por quatro representantes do CFC e quatro do Instituto dos Auditores Independentes do Brasil.',
        ref: 'p. 144 (4.9.2)',
      },
      {
        id: 'mandato', tipo: 'select', peso: 10,
        titulo: 'Qual é o mandato dos representantes?',
        ajuda: 'Prazo e recondução.',
        opcoes: [
          { id: '3', label: 'Três anos, permitida a recondução' },
          { id: '5', label: 'Cinco anos, sem recondução' },
          { id: '1', label: 'Um ano' },
        ],
        correto: '3',
        explicacao: 'Os representantes são nomeados por três anos, sendo permitida a recondução.',
        ref: 'p. 144 (4.9.2)',
      },
      {
        id: 'tramite', tipo: 'select', peso: 10,
        titulo: 'Qual é o caminho das decisões do CRE?',
        ajuda: 'As decisões constam em ata. Para onde ela vai?',
        opcoes: [
          { id: 'certo', label: 'Ata → Vice-presidente Técnico do CFC → Câmara Técnica → Plenário do CFC' },
          { id: 'direto', label: 'Ata → direto ao Plenário do CFC' },
          { id: 'cvm', label: 'Ata → CVM → CFC' },
        ],
        correto: 'certo',
        explicacao: 'A ata vai ao Vice-presidente Técnico do CFC, que a submete à Câmara Técnica e, depois, ao Plenário, para homologação.',
        ref: 'p. 144 (4.9.2)',
      },
      {
        id: 'tipos', tipo: 'select', peso: 10,
        titulo: 'Quais são os tipos de relatório de revisão?',
        ajuda: 'Veja o item sobre tipos de relatório.',
        opcoes: [
          { id: 'quatro', label: 'Sem ressalvas, com ressalvas, com opinião adversa e com abstenção de opinião' },
          { id: 'dois', label: 'Aprovado e reprovado' },
          { id: 'tres', label: 'Sem ressalvas, com ressalvas e com opinião adversa' },
        ],
        correto: 'quatro',
        explicacao: 'O relatório pode ser de quatro tipos: sem ressalvas, com ressalvas, com opinião adversa e com abstenção de opinião.',
        ref: 'p. 148 (4.9.9)',
      },
      {
        id: 'penalidade', tipo: 'select', peso: 10,
        titulo: 'O que acontece com quem descumpre a norma?',
        ajuda: 'Veja o item sobre penalidades.',
        opcoes: [
          { id: 'infracao', label: 'Infração disciplinar, sujeita às penalidades do art. 27 (alíneas c a g) do Decreto-lei nº 9.295/1946' },
          { id: 'nada', label: 'Nada: a norma é só uma orientação' },
          { id: 'multa', label: 'Multa fixa paga à CVM' },
        ],
        correto: 'infracao',
        explicacao: 'A inobservância da norma é infração disciplinar, sujeita às penalidades das alíneas c a g do art. 27 do Decreto-lei nº 9.295/1946.',
        ref: 'p. 149 (4.9.12)',
      },
      {
        id: 'irregulares', tipo: 'evidencias', filtro: 'ato', peso: 50,
        titulo: 'Quais atos do quadro são irregulares?',
        ajuda: 'Marque, entre os atos que você fixou, só os que contrariam a norma. Marcar atos corretos tira nota.',
        correto: ['ato:T2', 'ato:T3', 'ato:T5', 'ato:T6', 'ato:T7', 'ato:T8'],
        minimo: 6,
        explicacao:
          'Irregulares: T2 (o mandato é de três anos, com recondução), T3 (a ata passa pelo Vice-presidente Técnico e pela Câmara Técnica antes do Plenário), ' +
          'T5 (havendo evidência de descumprimento, a carta de recomendação circunstanciada é devida), T6 (não se divulgam informações da revisão, nem depois do fim), ' +
          'T7 (revisões recíprocas são vedadas; exceções vão ao CRE) e T8 (a revisão trata só das normas, sem questões de negócios).',
        ref: 'p. 144 a 147 (4.9.2, 4.9.4, 4.9.7)',
      },
    ],
  },

  referencias: [
    { pagina: 'p. 144', item: '4.9.2', uso: 'Composição, mandato e atribuições do CRE; ata; carta de recomendação circunstanciada' },
    { pagina: 'p. 145', item: '4.9.4', uso: 'Sigilo e revisões recíprocas vedadas' },
    { pagina: 'p. 146 e 147', item: '4.9.6 e 4.9.7', uso: 'Guarda da documentação por sete anos e escopo da revisão' },
    { pagina: 'p. 148', item: '4.9.9', uso: 'Os quatro tipos de relatório e a carta de recomendações' },
    { pagina: 'p. 149', item: '4.9.12', uso: 'Penalidades' },
  ],

  debriefing:
    'Irregulares: T2 (mandato de três anos, com recondução), T3 (a ata passa pela Câmara Técnica), T5 (carta de recomendação circunstanciada devida), T6 (sigilo, mesmo depois do fim), ' +
    'T7 (revisão recíproca vedada) e T8 (a revisão não trata de negócios do revisado com clientes). ' +
    'Corretos: T1 (4 + 4), T4 (caminho da ata), T9 (guarda por sete anos) e T10 (abstenção de opinião exige carta de recomendações).',
}
