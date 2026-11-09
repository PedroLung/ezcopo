// CASO 2 - "O fornecedor fantasma"
// Conceito ensinado: segregação de funções (quem pede não pode aprovar) em compras.
// Modo solo: sem missões, sem dicas, sem faixas de ajuda.

export const caso2 = {
  id: 'caso2',
  titulo: 'Caso 2 - O fornecedor fantasma',
  empresa: 'Mercantil Aurora S.A.',
  tutorial: false,
  apps: ['mensagens', 'funcionarios', 'contas', 'fornecedores', 'pedidos', 'logs', 'normas', 'caderno', 'relatorio'],

  resumoInicial:
    'Outubro de 2025. O Financeiro fechou o mês com as despesas de manutenção muito acima do previsto. ' +
    'Desta vez você já conhece o sistema: não há guia. Investigue por conta própria e entregue o relatório quando tiver as provas.',

  mensagens: [
    {
      id: 'm1',
      de: 'Ricardo Menezes (Diretor Financeiro)',
      assunto: 'Despesas de manutenção fora do previsto',
      audio: true,
      // Grave e coloque em public/audio/chefe-caso2.m4a
      arquivoAudio: 'audio/chefe-caso2.m4a',
      texto:
        'Oi, auditor, é o Ricardo de novo. Fechamos o mês e as despesas de manutenção ficaram bem acima do previsto, ' +
        'e ninguém consegue me explicar o motivo. Todos os pedidos têm aprovação, então no papel está tudo certo. Mas eu quero ter certeza. ' +
        'Revise as compras de setembro e começo de outubro e me diga se existe alguma falha de controle, quem está envolvido e o que a gente precisa mudar. ' +
        'Não quero acusar ninguém sem prova. Conto com você.',
    },
    {
      id: 'm2',
      de: 'Diego Fontes (Supervisor de Manutenção)',
      assunto: 'Sobre os serviços terceirizados',
      audio: false,
      texto:
        'Auditor, só para constar: a manutenção preventiva deste mês foi feita pela nossa equipe interna. ' +
        'Não me lembro de ter pedido nenhum serviço de empresa terceirizada. Se precisar de algo da minha área, me avise.',
    },
  ],

  missoes: [],

  funcionarios: [
    { id: 'F005', nome: 'Patrícia Souza', setor: 'Compras', cargo: 'Compradora', admissao: '2022-04-18', desligamento: '-', telefone: '(11) 98877-1020' },
    { id: 'F007', nome: 'Fernando Teixeira', setor: 'Compras', cargo: 'Coordenador de Compras', admissao: '2017-02-13', desligamento: '-', telefone: '(11) 97654-3321' },
    { id: 'F008', nome: 'Bianca Moraes', setor: 'Financeiro', cargo: 'Analista de Contas a Pagar', admissao: '2021-10-05', desligamento: '-', telefone: '(11) 95512-7788' },
    { id: 'F009', nome: 'Diego Fontes', setor: 'Manutenção', cargo: 'Supervisor', admissao: '2020-08-17', desligamento: '-', telefone: '(11) 94433-9012' },
    { id: 'F010', nome: 'Larissa Campos', setor: 'Compras', cargo: 'Assistente', admissao: '2024-01-15', desligamento: '-', telefone: '(11) 93321-4455' },
    { id: 'F011', nome: 'Otávio Brandão', setor: 'Financeiro', cargo: 'Gerente Financeiro', admissao: '2015-05-25', desligamento: '-', telefone: '(11) 98123-6600' },
    { id: 'F012', nome: 'Sérgio Nunes', setor: 'Manutenção', cargo: 'Técnico', admissao: '2019-11-04', desligamento: '2025-06-30', telefone: '(11) 92200-8841' },
  ],

  contas: [
    { usuario: 'usr_0390', func: 'F005', perfil: 'Compras (criar pedidos)', status: 'Ativa', ultimoLogin: '2025-10-06 08:12' },
    { usuario: 'usr_0610', func: 'F007', perfil: 'Compras + Aprovação até R$ 10.000 + Cadastro de fornecedores', status: 'Ativa', ultimoLogin: '2025-10-06 08:05' },
    { usuario: 'usr_0145', func: 'F008', perfil: 'Financeiro (pagamentos)', status: 'Ativa', ultimoLogin: '2025-10-06 09:01' },
    { usuario: 'usr_0288', func: 'F009', perfil: 'Requisitante Manutenção', status: 'Ativa', ultimoLogin: '2025-10-06 08:30' },
    { usuario: 'usr_0702', func: 'F010', perfil: 'Compras (criar pedidos)', status: 'Ativa', ultimoLogin: '2025-10-03 17:40' },
    { usuario: 'usr_0099', func: 'F011', perfil: 'Aprovador Financeiro (sem limite)', status: 'Ativa', ultimoLogin: '2025-10-01 14:38' },
    { usuario: 'usr_0333', func: 'F012', perfil: 'Requisitante Manutenção', status: 'Desativada', ultimoLogin: '2025-06-30 17:50' },
  ],

  fornecedores: [
    { id: 'FN01', razao: 'Aço Brasil Comércio Ltda', cnpj: '12.345.678/0001-90', endereco: 'Av. Industrial, 1200 - Guarulhos', telefone: '(11) 4002-1100', cadastro: '2019-03-10', cadastradoPor: 'usr_0390' },
    { id: 'FN02', razao: 'Papelaria Central ME', cnpj: '23.456.789/0001-01', endereco: 'Rua do Comércio, 45 - São Paulo', telefone: '(11) 3222-4400', cadastro: '2025-09-15', cadastradoPor: 'usr_0702' },
    { id: 'FN03', razao: 'Limpex Produtos de Limpeza', cnpj: '45.678.901/0001-23', endereco: 'Rod. Anhanguera km 21 - Osasco', telefone: '(11) 3600-7788', cadastro: '2021-06-02', cadastradoPor: 'usr_0390' },
    { id: 'FN04', razao: 'ElétricaMax Materiais', cnpj: '56.789.012/0001-34', endereco: 'Rua Voluntários, 310 - São Paulo', telefone: '(11) 3055-2200', cadastro: '2020-01-20', cadastradoPor: 'usr_0390' },
    { id: 'FN05', razao: 'TecnoServ Manutenção ME', cnpj: '34.567.890/0001-12', endereco: 'Rua das Acácias, 77 - Osasco', telefone: '(11) 97654-3321', cadastro: '2025-09-22', cadastradoPor: 'usr_0610' },
  ],

  pedidos: [
    { id: 'P01', data: '2025-09-03', solicitante: 'usr_0288', fornecedor: 'FN04', descricao: 'Reposição de lâmpadas e fios', valor: 'R$ 3.420,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P02', data: '2025-09-05', solicitante: 'usr_0702', fornecedor: 'FN02', descricao: 'Material de escritório', valor: 'R$ 1.150,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P03', data: '2025-09-08', solicitante: 'usr_0288', fornecedor: 'FN01', descricao: 'Chapas de aço para manutenção', valor: 'R$ 8.900,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P04', data: '2025-09-10', solicitante: 'usr_0390', fornecedor: 'FN03', descricao: 'Produtos de limpeza', valor: 'R$ 2.780,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P05', data: '2025-09-12', solicitante: 'usr_0288', fornecedor: 'FN01', descricao: 'Peças de reposição (prensa)', valor: 'R$ 14.300,00', aprovador: 'usr_0099', status: 'Pago' },
    { id: 'P06', data: '2025-09-16', solicitante: 'usr_0702', fornecedor: 'FN04', descricao: 'Cabos e disjuntores', valor: 'R$ 4.560,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P07', data: '2025-09-23', solicitante: 'usr_0610', fornecedor: 'FN05', descricao: 'Serviço de manutenção preventiva', valor: 'R$ 9.800,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P08', data: '2025-09-24', solicitante: 'usr_0288', fornecedor: 'FN03', descricao: 'Produtos de limpeza', valor: 'R$ 1.990,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P09', data: '2025-09-26', solicitante: 'usr_0610', fornecedor: 'FN05', descricao: 'Serviço de manutenção corretiva', valor: 'R$ 9.900,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P10', data: '2025-09-29', solicitante: 'usr_0390', fornecedor: 'FN02', descricao: 'Material de escritório', valor: 'R$ 860,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P11', data: '2025-10-01', solicitante: 'usr_0610', fornecedor: 'FN01', descricao: 'Chapas de aço', valor: 'R$ 6.200,00', aprovador: 'usr_0099', status: 'Pago' },
    { id: 'P12', data: '2025-10-03', solicitante: 'usr_0610', fornecedor: 'FN05', descricao: 'Consultoria técnica em manutenção', valor: 'R$ 9.750,00', aprovador: 'usr_0610', status: 'Pago' },
    { id: 'P13', data: '2025-10-06', solicitante: 'usr_0288', fornecedor: 'FN04', descricao: 'Materiais elétricos', valor: 'R$ 5.340,00', aprovador: 'usr_0610', status: 'Pendente' },
  ],

  logs: [
    { id: 'L01', ts: '2025-09-10 09:02', usuario: 'usr_0333', ip: '10.0.0.61', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'NEGADO (conta desativada)' },
    { id: 'L02', ts: '2025-09-12 14:20', usuario: 'usr_0099', ip: '10.0.0.9', acao: 'APROVAR_PEDIDO', recurso: 'Pedido P05', resultado: 'OK' },
    { id: 'L03', ts: '2025-09-15 10:05', usuario: 'usr_0702', ip: '10.0.0.47', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'FALHA (senha incorreta)' },
    { id: 'L04', ts: '2025-09-15 10:06', usuario: 'usr_0702', ip: '10.0.0.47', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'OK' },
    { id: 'L05', ts: '2025-09-15 10:20', usuario: 'usr_0702', ip: '10.0.0.47', acao: 'CADASTRAR_FORNECEDOR', recurso: 'Papelaria Central ME (FN02)', resultado: 'OK' },
    { id: 'L06', ts: '2025-09-22 20:41', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'CADASTRAR_FORNECEDOR', recurso: 'TecnoServ Manutenção ME (FN05)', resultado: 'OK' },
    { id: 'L07', ts: '2025-09-23 08:14', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'CRIAR_PEDIDO', recurso: 'Pedido P07', resultado: 'OK' },
    { id: 'L08', ts: '2025-09-23 08:15', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'APROVAR_PEDIDO', recurso: 'Pedido P07', resultado: 'OK' },
    { id: 'L09', ts: '2025-09-26 19:02', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'CRIAR_PEDIDO', recurso: 'Pedido P09', resultado: 'OK' },
    { id: 'L10', ts: '2025-09-26 19:03', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'APROVAR_PEDIDO', recurso: 'Pedido P09', resultado: 'OK' },
    { id: 'L11', ts: '2025-09-30 11:30', usuario: 'usr_0145', ip: '10.0.0.33', acao: 'PAGAR_PEDIDO', recurso: 'Pedido P07', resultado: 'OK' },
    { id: 'L12', ts: '2025-10-01 09:15', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'CRIAR_PEDIDO', recurso: 'Pedido P11', resultado: 'OK' },
    { id: 'L13', ts: '2025-10-01 14:40', usuario: 'usr_0099', ip: '10.0.0.9', acao: 'APROVAR_PEDIDO', recurso: 'Pedido P11', resultado: 'OK' },
    { id: 'L14', ts: '2025-10-03 18:47', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'CRIAR_PEDIDO', recurso: 'Pedido P12', resultado: 'OK' },
    { id: 'L15', ts: '2025-10-03 18:48', usuario: 'usr_0610', ip: '10.0.0.22', acao: 'APROVAR_PEDIDO', recurso: 'Pedido P12', resultado: 'OK' },
    { id: 'L16', ts: '2025-10-06 08:30', usuario: 'usr_0288', ip: '10.0.0.58', acao: 'CRIAR_PEDIDO', recurso: 'Pedido P13', resultado: 'OK' },
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
      texto:
        'Quem solicita uma operação sensível (compra, pagamento) não pode ser a mesma pessoa que a aprova. ' +
        'O cadastro de fornecedores também deve ser independente de quem compra e aprova.',
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
      titulo: 'Alçada de Aprovação de Compras',
      texto: 'Pedidos de até R$ 10.000,00 podem ser aprovados pelo Coordenador de Compras. Acima desse valor, é obrigatória a aprovação do Gerente Financeiro.',
    },
  ],

  opcoes: {
    achados: [
      { id: 'segregacao', label: 'Falta de segregação de funções' },
      { id: 'limite_alcada', label: 'Aprovações acima da alçada permitida' },
      { id: 'conta_orfa', label: 'Conta ativa de ex-funcionário (conta órfã)' },
      { id: 'senha_fraca', label: 'Política de senhas fraca' },
      { id: 'backup_falho', label: 'Falha na rotina de backup' },
    ],
    riscos: [
      { id: 'baixo', label: 'Baixo' },
      { id: 'medio', label: 'Médio' },
      { id: 'alto', label: 'Alto' },
      { id: 'critico', label: 'Crítico' },
    ],
    recomendacoes: [
      { id: 'bloquear_mesmo_usuario', label: 'Configurar o sistema para impedir que o mesmo usuário crie e aprove um pedido' },
      { id: 'suspender_fornecedor', label: 'Suspender os pagamentos ao fornecedor suspeito e investigá-lo' },
      { id: 'separar_cadastro', label: 'Separar quem cadastra fornecedores de quem compra e aprova' },
      { id: 'aumentar_alcada', label: 'Aumentar a alçada de aprovação do Coordenador de Compras' },
      { id: 'trocar_erp', label: 'Trocar o sistema ERP por outro' },
      { id: 'proibir_manutencao', label: 'Proibir a área de Manutenção de solicitar compras' },
    ],
  },

  gabarito: {
    achado: 'segregacao',
    usuario: 'usr_0610',
    norma: 'N-02',
    evidencias: [
      'forn:FN05', 'ped:P07', 'ped:P09', 'ped:P12', 'func:F007', 'conta:usr_0610',
      'log:L06', 'log:L07', 'log:L08', 'log:L09', 'log:L10', 'log:L14', 'log:L15',
    ],
    evidenciasMinimas: 3,
    risco: 'alto',
    recomendacoes: ['bloquear_mesmo_usuario', 'suspender_fornecedor', 'separar_cadastro'],
    dicas: {
      achado: 'Pense em quem faz cada etapa: pedir, aprovar e cadastrar o fornecedor. Existe alguma etapa sem independência?',
      usuario: 'Procure a conta que aparece ao mesmo tempo como solicitante e como aprovador no mesmo pedido.',
      norma: 'Os valores até R$ 10.000 são permitidos pela alçada. O problema não é o valor, é quem fez cada etapa.',
      risco: 'Dinheiro da empresa foi pago a um fornecedor ligado a quem aprovou. Pense no impacto financeiro e na fraude.',
      riscoOk: 'Avaliação coerente: pagamentos de quase R$ 30 mil a um fornecedor ligado a quem aprovou.',
    },
  },

  debriefing:
    'Fernando Teixeira (usr_0610) cadastrou a empresa TecnoServ às 20h41, usando o telefone dele mesmo como contato. ' +
    'Depois, criou e aprovou sozinho três pedidos para ela (P07, P09 e P12), em intervalos de um minuto, somando R$ 29.450,00, ' +
    'sempre logo abaixo do limite de R$ 10.000 que exigiria a aprovação do gerente. ' +
    'O perfil dele permitia cadastrar fornecedor, pedir e aprovar, e o sistema não impedia que a mesma conta fizesse as três coisas. ' +
    'Lição: segregação de funções (N-02) existe para que ninguém consiga cometer e esconder uma fraude sozinho. ' +
    'As outras pistas eram falsas: o P05 (R$ 14.300) passou pela alçada correta com o gerente, o P11 foi pedido por Fernando mas aprovado por outra pessoa (o controle funcionou), ' +
    'a Papelaria Central é um fornecedor novo, mas legítimo, e o usr_0702 só errou a senha uma vez.',
}
