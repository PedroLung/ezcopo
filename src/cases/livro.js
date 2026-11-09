// ÚNICA FONTE DE CONTEÚDO DO JOGO:
// CREPALDI, Silvio Aparecido. Auditoria contábil: ferramenta de controle e informação.
// Uberlândia: [s.n.], 2025. Capítulo 4 - Controle de Qualidade no Exercício de Auditoria.
// Seção 4.9 - Normas sobre a revisão externa de qualidade pelos pares (p. 142 a 149).
//
// Resumos curtos e fiéis ao livro. Cada item informa a página de onde saiu.
// Nada aqui vem de outra fonte.

export const LIVRO = 'CREPALDI, 2025'

export const normasLivro = [
  {
    id: '4.9.1',
    titulo: '4.9.1 Objetivo',
    ref: 'p. 142',
    texto:
      'A revisão pelos pares é um processo de acompanhamento e controle de qualidade dos trabalhos dos auditores independentes. ' +
      'A qualidade é medida pelo cumprimento das Normas Brasileiras de Contabilidade (CFC) e, na insuficiência delas, dos pronunciamentos do IBRACON e das normas de órgãos reguladores.',
  },
  {
    id: '4.9.2-a',
    titulo: '4.9.2 O que é a revisão pelos pares',
    ref: 'p. 142',
    texto:
      'É o exame feito por um auditor independente nos trabalhos de outro auditor independente. Verifica se: ' +
      '(1) os procedimentos e as técnicas seguem as normas; e (2) o sistema de controle de qualidade está adequado, conforme a NBC PA 01.',
  },
  {
    id: '4.9.2-b',
    titulo: '4.9.2 Partes e documentos',
    ref: 'p. 143',
    texto:
      'CRE: administra o programa de revisão. Auditor-revisor: faz a revisão individual e elabora o relatório de revisão (apresentado ao CRE). ' +
      'Auditor-revisado: a firma ou o auditor que será revisado; elabora o plano de ação (apresentado ao CRE). ' +
      'Ano-base: pode ser o ano anterior ao da indicação, e também outros anos não revisados na última revisão.',
  },
  {
    id: '4.9.2-d',
    titulo: '4.9.2 Ciclo e seleção',
    ref: 'p. 143',
    texto:
      'Cada auditor é revisado, no mínimo, uma vez a cada ciclo de quatro anos. Em janeiro, o CRE seleciona quem será revisado; ' +
      'entram obrigatoriamente os que obtiveram cadastro na CVM no ano anterior (o ano-base). O CRE pode determinar períodos menores por problemas específicos relatados.',
  },
  {
    id: '4.9.2-e',
    titulo: '4.9.2 Nova revisão e carta de recomendação',
    ref: 'p. 144',
    texto:
      'O revisado faz nova revisão no ano seguinte quando: o relatório tem opinião adversa ou abstenção de opinião; ou o relatório de revisão e/ou o plano de ação não são aprovados pelo CRE. ' +
      'O revisor elabora carta de recomendação circunstanciada quando há evidência de que o revisado não cumpriu as políticas e procedimentos de controle de qualidade. ' +
      'A opinião sobre o sistema é emitida mesmo que o revisado não tenha emitido relatório de auditoria no período.',
  },
  {
    id: '4.9.2-f',
    titulo: '4.9.2 O CRE: composição e atribuições',
    ref: 'p. 144',
    texto:
      'Composição: quatro representantes do CFC e quatro do Instituto dos Auditores Independentes do Brasil, registrados no CNAI e na CVM, com mandato de três anos (permitida a recondução). ' +
      'Atribuições: selecionar os auditores a revisar, emitir guias e questionários, aprovar ou não os relatórios e planos de ação, e emitir o relatório sumário anual.',
  },
  {
    id: '4.9.2-h',
    titulo: '4.9.2 Decisões do CRE',
    ref: 'p. 144',
    texto:
      'As decisões constam em ata, enviada ao Vice-presidente Técnico do CFC, que a submete à Câmara Técnica e, depois, ao Plenário do CFC, para homologação.',
  },
  {
    id: '4.9.4',
    titulo: '4.9.4 Sigilo e independência',
    ref: 'p. 145',
    texto:
      'Quem participa da revisão não pode divulgar as informações obtidas, em nenhuma fase nem depois do término. ' +
      'Revisões recíprocas entre auditores são vedadas (exceções precisam da aprovação do CRE). ' +
      'Quem tem parentesco com executivo-chave de cliente do revisado não pode revisar esse revisado.',
  },
  {
    id: '4.9.6-7',
    titulo: '4.9.6 e 4.9.7 O revisor e o escopo',
    ref: 'p. 146 e 147',
    texto:
      'A escolha do revisor cabe ao revisado (p. 146). O revisor guarda por sete anos a documentação da revisão (p. 146). ' +
      'A revisão trata exclusivamente do atendimento às normas, sem questões de negócios entre o revisado e seus clientes (p. 147).',
  },
  {
    id: '4.9.8-9',
    titulo: '4.9.8 e 4.9.9 Relatório e plano de ação',
    ref: 'p. 148 e 149',
    texto:
      'O relatório do revisor sai em até 45 dias após a finalização da revisão em campo (p. 148). ' +
      'Há quatro tipos de relatório: sem ressalvas, com ressalvas, com opinião adversa e com abstenção de opinião; a carta de recomendações é obrigatória na opinião adversa e na abstenção (p. 148). ' +
      'O plano de ação do revisado sai em até 30 dias do recebimento do relatório (p. 149).',
  },
  {
    id: '4.9.10-11',
    titulo: '4.9.10 e 4.9.11 Prazos e recurso',
    ref: 'p. 149',
    texto:
      'O revisado que não contrata revisor fica automaticamente indicado para a revisão no ano seguinte. ' +
      'O revisor que não cumpre os prazos fica automaticamente impedido de atuar como revisor no ano seguinte. ' +
      'Das decisões do CRE cabe recurso ao Tribunal Superior de Ética e Disciplina do CFC, em 15 dias após a notificação.',
  },
  {
    id: '4.9.12',
    titulo: '4.9.12 Penalidades',
    ref: 'p. 149',
    texto:
      'Descumprir a norma é infração disciplinar, sujeita às penalidades das alíneas c a g do art. 27 do Decreto-lei nº 9.295/1946 (alterado pela Lei nº 12.249/2010) e, quando aplicável, ao Código de Ética Profissional do Contador.',
  },
]
