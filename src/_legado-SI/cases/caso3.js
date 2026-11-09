// CASO 3 - "A folha que não fechava"
// Conceito ensinado: gestão de mudanças (alteração em dado crítico exige chamado aprovado).
// Modo solo, mais difícil: várias alterações legítimas e atividades fora do horário que NÃO são o problema.

export const caso3 = {
  id: 'caso3',
  titulo: 'Caso 3 - A folha que não fechava',
  empresa: 'Mercantil Aurora S.A.',
  tutorial: false,
  apps: ['mensagens', 'funcionarios', 'contas', 'folha', 'chamados', 'logs', 'normas', 'caderno', 'relatorio'],

  resumoInicial:
    'Fim de setembro de 2025. A folha de pagamento fechou com uma diferença que ninguém sabe explicar. ' +
    'Há movimentação fora do horário, alterações aprovadas e outras nem tanto. Nem tudo que parece estranho é o problema: ' +
    'separe o que tem justificativa do que não tem. Sem guia desta vez.',

  mensagens: [
    {
      id: 'm1',
      de: 'Ricardo Menezes (Diretor Financeiro)',
      assunto: 'Folha de setembro com diferença',
      audio: true,
      // Grave e coloque em public/audio/chefe-caso3.m4a
      arquivoAudio: 'audio/chefe-caso3.m4a',
      texto:
        'Oi, auditor, é o Ricardo de novo. Fechamos a folha de setembro e deu uma diferença de sete mil reais a mais do que o previsto. ' +
        'O RH jura que não pediu nenhum reajuste fora do combinado. Eu preciso saber como o salário de alguém foi alterado, ' +
        'quem fez isso e se a empresa tinha algum controle para impedir. Veja a folha, os chamados de mudança e os logs de setembro. ' +
        'Tenha cuidado, tem gente envolvida. Quero as provas antes de qualquer conversa com o RH.',
    },
    {
      id: 'm2',
      de: 'Wagner Duarte (Gerente de RH)',
      assunto: 'Reajustes de setembro',
      audio: false,
      texto:
        'Auditor, pelo que eu sei, em setembro só aprovamos dois reajustes: a promoção do Eduardo, da Vendas, e o ajuste da Beatriz, da Logística. ' +
        'Fora isso, só o reajuste anual automático. Se aparecer qualquer outra coisa, eu não conheço.',
    },
  ],

  missoes: [],

  funcionarios: [
    { id: 'F001', nome: 'Marta Ribeiro', setor: 'Financeiro', cargo: 'Analista', admissao: '2019-03-11', desligamento: '-' },
    { id: 'F003', nome: 'Juliana Prado', setor: 'TI', cargo: 'Administradora de Sistemas', admissao: '2020-01-20', desligamento: '-' },
    { id: 'F010', nome: 'Ricardo Menezes', setor: 'Diretoria', cargo: 'Diretor Financeiro', admissao: '2012-08-06', desligamento: '-' },
    { id: 'F013', nome: 'Cláudio Ferraz', setor: 'RH', cargo: 'Analista de Folha de Pagamento', admissao: '2020-02-10', desligamento: '-' },
    { id: 'F014', nome: 'Renata Ferraz', setor: 'Logística', cargo: 'Auxiliar Administrativa', admissao: '2023-05-22', desligamento: '-' },
    { id: 'F015', nome: 'Wagner Duarte', setor: 'RH', cargo: 'Gerente de RH', admissao: '2016-09-12', desligamento: '-' },
    { id: 'F016', nome: 'Beatriz Lemos', setor: 'Logística', cargo: 'Coordenadora', admissao: '2018-03-05', desligamento: '-' },
    { id: 'F017', nome: 'Eduardo Sales', setor: 'Vendas', cargo: 'Vendedor Sênior', admissao: '2022-07-11', desligamento: '-' },
  ],

  contas: [
    { usuario: 'usr_0101', func: 'F001', perfil: 'Financeiro', status: 'Ativa', ultimoLogin: '2025-09-30 08:50' },
    { usuario: 'usr_0033', func: 'F003', perfil: 'Administrador de sistemas', status: 'Ativa', ultimoLogin: '2025-09-30 23:00' },
    { usuario: 'usr_0010', func: 'F010', perfil: 'Aprovador de mudanças (Diretoria)', status: 'Ativa', ultimoLogin: '2025-09-29 10:15' },
    { usuario: 'usr_0845', func: 'F013', perfil: 'RH - Folha de pagamento (alterar salários)', status: 'Ativa', ultimoLogin: '2025-09-19 21:47' },
    { usuario: 'usr_0377', func: 'F014', perfil: 'Logística (consulta)', status: 'Ativa', ultimoLogin: '2025-09-12 08:40' },
    { usuario: 'usr_0460', func: 'F015', perfil: 'RH - Gerente (solicita mudanças)', status: 'Ativa', ultimoLogin: '2025-09-22 08:55' },
    { usuario: 'usr_0512', func: 'F016', perfil: 'Logística', status: 'Ativa', ultimoLogin: '2025-09-26 09:10' },
    { usuario: 'usr_0600', func: 'F017', perfil: 'Vendas (consulta)', status: 'Ativa', ultimoLogin: '2025-09-25 14:02' },
  ],

  folha: [
    { id: 'FL01', func: 'F001 Marta Ribeiro', anterior: 'R$ 4.100,00', atual: 'R$ 4.305,00', data: '2025-09-01', alteradoPor: 'SISTEMA', chamado: 'Reajuste anual automático (5%)' },
    { id: 'FL02', func: 'F015 Wagner Duarte', anterior: 'R$ 9.500,00', atual: 'R$ 9.975,00', data: '2025-09-01', alteradoPor: 'SISTEMA', chamado: 'Reajuste anual automático (5%)' },
    { id: 'FL03', func: 'F017 Eduardo Sales', anterior: 'R$ 3.200,00', atual: 'R$ 3.900,00', data: '2025-09-05', alteradoPor: 'usr_0845', chamado: 'CH-0211' },
    { id: 'FL04', func: 'F016 Beatriz Lemos', anterior: 'R$ 6.800,00', atual: 'R$ 7.300,00', data: '2025-09-05', alteradoPor: 'usr_0845', chamado: 'CH-0212' },
    { id: 'FL05', func: 'F014 Renata Ferraz', anterior: 'R$ 2.400,00', atual: 'R$ 9.400,00', data: '2025-09-19', alteradoPor: 'usr_0845', chamado: '-' },
  ],

  chamados: [
    { id: 'CH-0211', data: '2025-09-03', solicitante: 'usr_0460', descricao: 'Promoção de Eduardo Sales para Vendedor Sênior: novo salário R$ 3.900,00', aprovador: 'usr_0010', status: 'Executado' },
    { id: 'CH-0212', data: '2025-09-04', solicitante: 'usr_0460', descricao: 'Ajuste salarial de Beatriz Lemos conforme política da empresa: R$ 7.300,00', aprovador: 'usr_0010', status: 'Executado' },
    { id: 'CH-0213', data: '2025-09-16', solicitante: 'usr_0033', descricao: 'Atualização de versão do servidor de folha (janela noturna)', aprovador: 'usr_0010', status: 'Executado' },
    { id: 'CH-0214', data: '2025-09-30', solicitante: 'usr_0033', descricao: 'Rotação mensal de arquivos de log', aprovador: 'usr_0010', status: 'Executado' },
  ],

  logs: [
    { id: 'L01', ts: '2025-09-05 09:12', usuario: 'usr_0845', ip: '10.0.0.71', acao: 'ALTERAR_SALARIO', recurso: 'F017 (CH-0211)', resultado: 'OK' },
    { id: 'L02', ts: '2025-09-05 09:20', usuario: 'usr_0845', ip: '10.0.0.71', acao: 'ALTERAR_SALARIO', recurso: 'F016 (CH-0212)', resultado: 'OK' },
    { id: 'L03', ts: '2025-09-12 08:40', usuario: 'usr_0377', ip: '10.0.0.80', acao: 'CONSULTAR', recurso: 'Próprio contracheque', resultado: 'OK' },
    { id: 'L04', ts: '2025-09-17 22:10', usuario: 'usr_0033', ip: '10.0.0.5', acao: 'ATUALIZAR_SERVIDOR', recurso: 'Servidor de folha (CH-0213)', resultado: 'OK' },
    { id: 'L05', ts: '2025-09-19 21:47', usuario: 'usr_0845', ip: '10.0.0.71', acao: 'LOGIN', recurso: 'Sistema de folha', resultado: 'OK' },
    { id: 'L06', ts: '2025-09-19 21:52', usuario: 'usr_0845', ip: '10.0.0.71', acao: 'ALTERAR_SALARIO', recurso: 'F014 (sem chamado)', resultado: 'OK' },
    { id: 'L07', ts: '2025-09-19 21:55', usuario: 'usr_0845', ip: '10.0.0.71', acao: 'LOGOUT', recurso: 'Sistema de folha', resultado: 'OK' },
    { id: 'L08', ts: '2025-09-22 08:55', usuario: 'usr_0460', ip: '10.0.0.12', acao: 'LOGIN', recurso: 'Sistema de folha', resultado: 'OK' },
    { id: 'L09', ts: '2025-09-25 14:02', usuario: 'usr_0600', ip: '10.0.0.66', acao: 'CONSULTAR', recurso: 'Próprio contracheque', resultado: 'OK' },
    { id: 'L10', ts: '2025-09-30 23:00', usuario: 'usr_0033', ip: '10.0.0.5', acao: 'ROTACIONAR_LOG', recurso: 'Arquivos de setembro (CH-0214)', resultado: 'OK' },
  ],

  normas: [
    {
      id: 'N-01',
      titulo: 'Gestão de Acessos',
      texto: 'O acesso de qualquer colaborador deve ser revogado em até 24 horas após o seu desligamento. O RH deve comunicar a TI no mesmo dia.',
    },
    {
      id: 'N-02',
      titulo: 'Segregação de Funções',
      texto: 'Quem solicita uma operação sensível (compra, pagamento) não pode ser a mesma pessoa que a aprova.',
    },
    {
      id: 'N-03',
      titulo: 'Política de Senhas',
      texto: 'Senhas devem ter no mínimo 8 caracteres, com troca a cada 90 dias. Após 5 tentativas incorretas a conta é bloqueada.',
    },
    {
      id: 'N-04',
      titulo: 'Cópias de Segurança (Backup)',
      texto: 'Backups do banco de dados devem ser diários e a restauração deve ser testada trimestralmente.',
    },
    {
      id: 'N-05',
      titulo: 'Registro e Monitoramento (Logs)',
      texto: 'Todas as ações em sistemas críticos devem ser registradas e os logs revisados mensalmente por alguém independente.',
    },
    {
      id: 'N-06',
      titulo: 'Gestão de Mudanças',
      texto:
        'Toda alteração em dados críticos (salários, permissões, configurações de servidores) exige um chamado de mudança aprovado ANTES de ser executada. ' +
        'Exceção: reajustes automáticos previstos em acordo coletivo, aplicados pelo próprio sistema.',
    },
  ],

  opcoes: {
    achados: [
      { id: 'mudanca_sem_chamado', label: 'Alteração em dado crítico sem chamado de mudança aprovado' },
      { id: 'privilegio', label: 'Privilégio excessivo (conta com mais acesso do que o cargo exige)' },
      { id: 'segregacao', label: 'Falta de segregação de funções' },
      { id: 'conta_orfa', label: 'Conta ativa de ex-funcionário (conta órfã)' },
      { id: 'backup_falho', label: 'Falha na rotina de backup' },
    ],
    riscos: [
      { id: 'baixo', label: 'Baixo' },
      { id: 'medio', label: 'Médio' },
      { id: 'alto', label: 'Alto' },
      { id: 'critico', label: 'Crítico' },
    ],
    recomendacoes: [
      { id: 'exigir_chamado', label: 'Bloquear no sistema a alteração de salários sem um chamado de mudança aprovado' },
      { id: 'apurar_pagamento', label: 'Apurar o pagamento indevido e corrigir o salário alterado, com RH e Diretoria' },
      { id: 'revisar_mudancas', label: 'Revisar periodicamente as alterações da folha comparando-as com os chamados' },
      { id: 'proibir_noturno', label: 'Proibir qualquer acesso aos sistemas depois das 18h' },
      { id: 'trocar_folha', label: 'Trocar o sistema de folha por outro' },
      { id: 'demitir_ti', label: 'Demitir a equipe de TI' },
    ],
  },

  gabarito: {
    achado: 'mudanca_sem_chamado',
    usuario: 'usr_0845',
    norma: 'N-06',
    evidencias: ['folha:FL05', 'log:L05', 'log:L06', 'log:L07', 'conta:usr_0845', 'func:F013', 'func:F014'],
    evidenciasMinimas: 3,
    risco: 'alto',
    recomendacoes: ['exigir_chamado', 'apurar_pagamento', 'revisar_mudancas'],
    dicas: {
      achado: 'Compare cada alteração da folha com os chamados aprovados. Qual alteração não tem justificativa formal?',
      usuario: 'Várias contas mexeram em algo. Procure a que fez a alteração que não tem chamado aprovado.',
      norma: 'O problema não é o horário nem o perfil da conta: é a falta de aprovação prévia de uma mudança em dado crítico.',
      risco: 'Um salário foi multiplicado sem aprovação. Pense no impacto financeiro e na possibilidade de fraude.',
      riscoOk: 'Avaliação coerente: salário quase 4 vezes maior, sem aprovação, a cada mês.',
    },
  },

  debriefing:
    'Cláudio Ferraz (usr_0845), analista de folha, fez login às 21h47 do dia 19/09 e, às 21h52, elevou o salário de Renata Ferraz de R$ 2.400 para R$ 9.400, ' +
    'sem nenhum chamado de mudança aprovado. As outras duas alterações feitas por ele (Eduardo e Beatriz) tinham chamado aprovado (CH-0211 e CH-0212): estavam corretas. ' +
    'Lição: gestão de mudanças (N-06). Todo dado crítico alterado precisa de aprovação prévia registrada, e alguém independente precisa comparar o que mudou com o que foi aprovado. ' +
    'Cuidado com as pistas falsas: o reajuste automático de 5% é previsto em acordo e não precisa de chamado; a atualização do servidor às 22h10 e a rotação de logs às 23h tinham chamado aprovado (CH-0213 e CH-0214), ' +
    'então horário fora do expediente, sozinho, não prova nada. O sobrenome igual (Ferraz) sugere um possível parentesco, mas isso é um indício para o RH e o jurídico apurarem, não uma prova: o que a auditoria prova é a alteração sem aprovação.',
}
