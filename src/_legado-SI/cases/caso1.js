// CASO 1 - "O fantasma do Financeiro"
// Conceito ensinado: contas órfãs / gestão de acessos no desligamento.

export const caso1 = {
  id: 'caso1',
  titulo: 'Caso 1 - O fantasma do Financeiro',
  empresa: 'Mercantil Aurora S.A.',
  tutorial: true, // true = mostra missões, ícone piscando e faixas de ajuda
  apps: ['mensagens', 'funcionarios', 'contas', 'logs', 'normas', 'caderno', 'relatorio'],

  mensagens: [
    {
      id: 'm1',
      de: 'Ricardo Menezes (Diretor Financeiro)',
      assunto: 'URGENTE - dados de clientes',
      audio: true,
      // Coloque sua gravação em public/audio/ com esse nome (veja public/audio/LEIA-ME.txt).
      // Sem o arquivo, o jogo lê o texto com a voz do navegador.
      arquivoAudio: 'audio/chefe-caso1.m4a',
      texto:
        'Oi, auditor. Recebi uma ligação de um cliente dizendo que a lista de clientes da empresa apareceu num grupo de vendas. ' +
        'Não sei como isso saiu daqui. Preciso que você verifique o que aconteceu, ' +
        'descubra qual conta está envolvida e me diga qual controle da empresa falhou. ' +
        'Os logs de setembro estão no sistema. Quero o relatório até o fim do dia.',
    },
  ],

  // Missões do modo treinamento. 'app' = ícone que fica piscando.
  // feito(e): e.audioOuvido, e.abriu(idApp), e.fixou(idEvidencia), e.entregue
  missoes: [
    {
      id: 'ouvir',
      titulo: 'Ouça o pedido do chefe',
      app: 'mensagens',
      detalhe: 'Abra as Mensagens e aperte "Ouvir áudio". O chefe diz o que aconteceu e o que ele quer de você.',
      dica: 'Clique no ícone piscando e depois no botão ▶ Ouvir áudio.',
      feito: (e) => e.audioOuvido,
    },
    {
      id: 'exportou',
      titulo: 'Descubra quem exportou a lista de clientes',
      app: 'logs',
      detalhe:
        'Logs são o "diário" do sistema: cada ação de cada usuário fica registrada. Busque a ação EXPORTAR e use "Fixar" na linha suspeita.',
      dica: 'Digite EXPORTAR no campo Buscar. A linha que aparecer mostra um usuário e o arquivo clientes_base.csv.',
      feito: (e) => e.fixou('log:L14'),
    },
    {
      id: 'externo',
      titulo: 'Veja de onde essa conta acessou',
      app: 'logs',
      detalhe:
        'IPs que começam com 10.0.0.x são da rede interna da empresa. Clique no usuário que você achou para filtrar tudo que ele fez e fixe o login feito de fora da empresa.',
      dica: 'Procure a ação LOGIN_VPN. O IP dela não começa com 10.0.0.',
      feito: (e) => e.fixou('log:L12'),
    },
    {
      id: 'conta',
      titulo: 'Confira a situação dessa conta na TI',
      app: 'contas',
      detalhe: 'Na lista de contas da TI, veja o status e o perfil de acesso da conta suspeita. Fixe a linha dela.',
      dica: 'Procure o mesmo usuário que fez a exportação. Repare no campo Status.',
      feito: (e) => e.fixou('conta:usr_0472'),
    },
    {
      id: 'rh',
      titulo: 'Descubra de quem é essa conta no RH',
      app: 'funcionarios',
      detalhe: 'A coluna "Func." da conta aponta o funcionário dono dela. No RH, veja se essa pessoa ainda trabalha na empresa e fixe a linha.',
      dica: 'Veja a coluna Desligamento. Uma data preenchida significa que a pessoa saiu da empresa.',
      feito: (e) => e.fixou('func:F002'),
    },
    {
      id: 'norma',
      titulo: 'Ache a regra que deveria ter evitado isso',
      app: 'normas',
      detalhe: 'Auditar é comparar o que aconteceu com o que as regras da empresa exigem. Leia as normas e escolha a que foi violada.',
      dica: 'Pense: qual regra fala sobre o que fazer com o acesso de quem sai da empresa?',
      feito: (e) => e.abriu('normas'),
    },
    {
      id: 'relatorio',
      titulo: 'Entregue o Relatório de Auditoria',
      app: 'relatorio',
      detalhe: 'Preencha os 6 campos. Cada um tem uma explicação. Suas evidências do Caderno aparecem para você marcar.',
      dica: 'Use o que você fixou: a conta, a norma e as provas formam o seu relatório.',
      feito: (e) => e.entregue,
    },
  ],

  funcionarios: [
    { id: 'F001', nome: 'Marta Ribeiro', setor: 'Financeiro', cargo: 'Analista', admissao: '2019-03-11', desligamento: '-' },
    { id: 'F002', nome: 'Carlos Almeida', setor: 'Financeiro', cargo: 'Analista Sênior', admissao: '2018-06-04', desligamento: '2025-08-15' },
    { id: 'F003', nome: 'Juliana Prado', setor: 'TI', cargo: 'Administradora de Sistemas', admissao: '2020-01-20', desligamento: '-' },
    { id: 'F004', nome: 'Roberto Lima', setor: 'Vendas', cargo: 'Vendedor', admissao: '2021-09-01', desligamento: '2025-07-30' },
    { id: 'F005', nome: 'Patrícia Souza', setor: 'Compras', cargo: 'Compradora', admissao: '2022-04-18', desligamento: '-' },
    { id: 'F006', nome: 'Henrique Dias', setor: 'Suporte', cargo: 'Estagiário', admissao: '2025-02-03', desligamento: '-' },
  ],

  contas: [
    { usuario: 'usr_0101', func: 'F001', perfil: 'Financeiro', status: 'Ativa', ultimoLogin: '2025-09-18 08:41' },
    { usuario: 'usr_0472', func: 'F002', perfil: 'Financeiro + Exportação', status: 'Ativa', ultimoLogin: '2025-09-03 23:12' },
    { usuario: 'usr_0033', func: 'F003', perfil: 'Administrador', status: 'Ativa', ultimoLogin: '2025-09-18 09:02' },
    { usuario: 'usr_0215', func: 'F004', perfil: 'Vendas', status: 'Desativada', ultimoLogin: '2025-07-30 17:55' },
    { usuario: 'usr_0390', func: 'F005', perfil: 'Compras', status: 'Ativa', ultimoLogin: '2025-09-17 18:20' },
    { usuario: 'usr_0518', func: 'F006', perfil: 'Suporte', status: 'Ativa', ultimoLogin: '2025-09-18 07:58' },
  ],

  logs: [
    { id: 'L01', ts: '2025-08-02 09:14', usuario: 'usr_0215', ip: '10.0.0.31', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'NEGADO (conta desativada)' },
    { id: 'L02', ts: '2025-08-15 17:30', usuario: 'usr_0472', ip: '10.0.0.14', acao: 'LOGOUT', recurso: 'Sistema ERP', resultado: 'OK' },
    { id: 'L03', ts: '2025-09-01 08:02', usuario: 'usr_0518', ip: '10.0.0.52', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'FALHA (senha incorreta)' },
    { id: 'L04', ts: '2025-09-01 08:03', usuario: 'usr_0518', ip: '10.0.0.52', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'OK' },
    { id: 'L05', ts: '2025-09-01 09:40', usuario: 'usr_0033', ip: '10.0.0.5', acao: 'ALTERAR_CONFIG', recurso: 'Servidor de e-mail', resultado: 'OK' },
    { id: 'L06', ts: '2025-09-02 08:55', usuario: 'usr_0101', ip: '10.0.0.14', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'OK' },
    { id: 'L07', ts: '2025-09-02 10:12', usuario: 'usr_0101', ip: '10.0.0.14', acao: 'CONSULTAR', recurso: 'Relatório de contas a pagar', resultado: 'OK' },
    { id: 'L08', ts: '2025-09-02 18:20', usuario: 'usr_0390', ip: '10.0.0.40', acao: 'APROVAR_PEDIDO', recurso: 'Pedido de compra #8841', resultado: 'OK' },
    { id: 'L09', ts: '2025-09-02 18:45', usuario: 'usr_0101', ip: '10.0.0.14', acao: 'LOGOUT', recurso: 'Sistema ERP', resultado: 'OK' },
    { id: 'L10', ts: '2025-09-03 08:30', usuario: 'usr_0518', ip: '10.0.0.52', acao: 'CONSULTAR', recurso: 'Chamados de suporte', resultado: 'OK' },
    { id: 'L11', ts: '2025-09-03 09:10', usuario: 'usr_0033', ip: '10.0.0.5', acao: 'BACKUP', recurso: 'Banco de dados ERP', resultado: 'OK' },
    { id: 'L12', ts: '2025-09-03 23:08', usuario: 'usr_0472', ip: '187.45.212.9', acao: 'LOGIN_VPN', recurso: 'Acesso remoto', resultado: 'OK' },
    { id: 'L13', ts: '2025-09-03 23:10', usuario: 'usr_0472', ip: '187.45.212.9', acao: 'CONSULTAR', recurso: 'Cadastro de clientes', resultado: 'OK' },
    { id: 'L14', ts: '2025-09-03 23:12', usuario: 'usr_0472', ip: '187.45.212.9', acao: 'EXPORTAR', recurso: 'clientes_base.csv (4.812 registros)', resultado: 'OK' },
    { id: 'L15', ts: '2025-09-03 23:13', usuario: 'usr_0472', ip: '187.45.212.9', acao: 'LOGOUT', recurso: 'Acesso remoto', resultado: 'OK' },
    { id: 'L16', ts: '2025-09-04 08:50', usuario: 'usr_0101', ip: '10.0.0.14', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'OK' },
    { id: 'L17', ts: '2025-09-17 18:20', usuario: 'usr_0390', ip: '10.0.0.40', acao: 'APROVAR_PEDIDO', recurso: 'Pedido de compra #8902', resultado: 'OK' },
    { id: 'L18', ts: '2025-09-18 09:02', usuario: 'usr_0033', ip: '10.0.0.5', acao: 'LOGIN', recurso: 'Sistema ERP', resultado: 'OK' },
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
  ],

  // Opções dos campos fechados do relatório
  opcoes: {
    achados: [
      { id: 'conta_orfa', label: 'Conta ativa de ex-funcionário (conta órfã)' },
      { id: 'segregacao', label: 'Falta de segregação de funções' },
      { id: 'privilegio', label: 'Privilégio excessivo de um perfil' },
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
      { id: 'desativar_conta', label: 'Desativar imediatamente a conta envolvida' },
      { id: 'processo_desligamento', label: 'Integrar o processo de desligamento entre RH e TI' },
      { id: 'revisao_acessos', label: 'Revisar periodicamente todas as contas ativas' },
      { id: 'treinar_vendas', label: 'Treinar o time de Vendas em atendimento' },
      { id: 'comprar_firewall', label: 'Comprar um firewall novo' },
      { id: 'demitir_ti', label: 'Demitir toda a equipe de TI' },
    ],
  },

  gabarito: {
    achado: 'conta_orfa',
    usuario: 'usr_0472',
    norma: 'N-01',
    // evidências que realmente provam o achado
    evidencias: ['func:F002', 'conta:usr_0472', 'log:L12', 'log:L14'],
    evidenciasMinimas: 3,
    risco: 'alto',
    recomendacoes: ['desativar_conta', 'processo_desligamento', 'revisao_acessos'],
    dicas: {
      achado: 'Releia os dados: o que há de errado com o ciclo de vida das contas?',
      usuario: 'Essa não é a conta que fez a exportação. Procure no log quem exportou os clientes.',
      norma: 'A norma escolhida não trata do que falhou. Releia a Biblioteca de Normas.',
      risco: 'Pense no impacto: dados de clientes saíram da empresa.',
      riscoOk: 'Avaliação coerente: dados pessoais vazados por acesso externo.',
    },
  },

  debriefing:
    'Carlos Almeida foi desligado em 15/08/2025, mas a conta usr_0472 continuou ativa e com perfil de exportação. ' +
    'Em 03/09, às 23h08, ela entrou via VPN de um IP externo e exportou 4.812 registros de clientes. ' +
    'Compare com usr_0215 (Roberto Lima): a conta dele foi desativada e a tentativa de login foi NEGADA. Esse é o controle funcionando. ' +
    'Lição: o processo de desligamento (RH -> TI) precisa revogar acessos em até 24h (N-01). Contas órfãs são uma das portas de entrada mais comuns para vazamentos. ' +
    'As outras anomalias eram falsos positivos: o usr_0518 errou a senha uma vez (normal) e o usr_0390 aprovou pedido às 18h20 (horário comercial estendido, e de dentro da rede interna).',
}
