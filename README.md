<p align="center">
  <img src="public/logo.png" alt="Ezcopo" width="360" />
</p>

<p align="center">
  <b>Simulador de auditoria em forma de jogo, para aprender a revisão externa de qualidade pelos pares.</b>
</p>

<p align="center">
  <img alt="Licença MIT" src="https://img.shields.io/badge/licen%C3%A7a-MIT-f0821f" />
  <img alt="React 18" src="https://img.shields.io/badge/React-18-61dafb" />
  <img alt="Vite 5" src="https://img.shields.io/badge/Vite-5-646cff" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Auth%20%2B%20PostgreSQL-3ecf8e" />
</p>

## Sobre o projeto

O **Ezcopo** é um jogo educativo feito como trabalho acadêmico de Sistemas de Informação.
Você é um(a) auditor(a) que recebe pedidos do chefe por e-mail, investiga quadros e documentos numa
área de trabalho simulada, fixa as evidências num caderno, compara tudo com a norma e entrega um
**relatório de auditoria** que é corrigido automaticamente, sem IA, com explicação e a **página do livro**
de cada resposta.

Todo o conteúdo vem de um único livro:

> CREPALDI, Silvio Aparecido. *Auditoria contábil: ferramenta de controle e informação*.
> Uberlândia: [s.n.], 2025. Capítulo 4, seção 4.9 (revisão externa de qualidade pelos pares), p. 142 a 149.

O mapa completo entre cada pergunta do jogo e a página do livro está em [REFERENCIAS.md](REFERENCIAS.md).

## O jogo

São três fases, cada uma com um e-mail do chefe (Ricardo Menezes) e quadros próprios:

| Fase | Tema | Livro |
|---|---|---|
| 1 (tutorial guiado) | Quem é quem: CRE, auditor-revisor e auditor-revisado | p. 142 e 143 |
| 2 | Calendário, prazos e nova revisão | p. 143, 144, 148 e 149 |
| 3 | O processo da revisão: atos do CRE e conduta do revisor | p. 144 a 149 |

**Como se joga:** ler o e-mail → investigar os quadros → fixar evidências → consultar a Biblioteca de Normas → entregar o relatório.

### Funcionalidades
- Área de trabalho com janelas arrastáveis, Biblioteca de Normas (resumos do livro com página) e Caderno de Evidências.
- Correção automática do relatório, com nota de 0 a 100 e explicação por pergunta.
- Contas com nick, e-mail e senha; a melhor nota de cada fase é salva.
- Progresso por fase: o aluno volta onde parou e pode refazer fases concluídas. A sequência é respeitada (as próximas ficam com cadeado).
- **Ranking** geral e **painel da professora** (notas de todos os alunos, com exportação em CSV).
- Música ambiente e efeitos sonoros gerados pelo próprio navegador (sem arquivos de terceiros).
- Visual aconchegante, com ícones [Lucide](https://lucide.dev).

## Tecnologias

- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev)
- [Supabase](https://supabase.com): autenticação e banco PostgreSQL com regras de segurança (RLS)
- [Lucide React](https://lucide.dev) (ícones), fontes Nunito e Fraunces via [Fontsource](https://fontsource.org)
- Web Audio API (música e efeitos)

## Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org) 18 ou superior e uma conta gratuita no [Supabase](https://supabase.com).

```bash
# 1. instalar as dependências
npm install

# 2. criar o arquivo de configuração e preencher com os dados do seu projeto Supabase
cp .env.example .env.local

# 3. iniciar o servidor de desenvolvimento
npm run dev
```

### Configurando o Supabase

1. Crie um projeto no Supabase.
2. No **SQL Editor**, rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql). Ele cria as tabelas, as regras de segurança e as funções do jogo.
3. Em **Authentication > Providers > Email**, desligue **Confirm email** (assim o aluno entra na hora).
4. Em **Project Settings > API**, copie a **URL** e a chave **pública** (`sb_publishable_...` ou `anon`) para o `.env.local`.
   Nunca use a chave secreta (`sb_secret_...` ou `service_role`): o jogo recusa essa chave de propósito.
5. Para dar acesso ao painel da professora, depois que ela criar a conta no jogo, rode no SQL Editor:
   ```sql
   update public.profiles set role = 'professor' where lower(nick) = lower('NICK_DA_PROFESSORA');
   ```

Sem o `.env.local`, o jogo roda como visitante: tudo funciona, mas as notas não são salvas.

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a versão final na pasta `dist` |
| `npm run preview` | Abre a versão final localmente |

## Publicação

O passo a passo para publicar de graça (Netlify ou Vercel) está em [DEPLOY.md](DEPLOY.md).

## Estrutura do projeto

```
.
├── public/             logo, favicon e (opcional) audio/musica.mp3
├── src/
│   ├── apps/           Mensagens, Normas, Caderno, Relatório e tabelas das fases
│   ├── cases/          fase1.js, fase2.js, fase3.js e livro.js (trechos do livro com página)
│   ├── components/     Janela, Tabela, Menu, Ranking, Painel do professor, etc.
│   ├── musica/         trilha ambiente gerada pelo navegador
│   ├── som/            efeitos sonoros gerados pelo navegador
│   ├── _legado-SI/     primeira versão do jogo (tema sistemas de informação), arquivada
│   ├── AuthContext.jsx login e perfil
│   ├── GameContext.jsx estado do jogo, fases, notas e histórico do navegador
│   ├── grade.js        correção automática do relatório
│   └── supabase.js     cliente do Supabase
├── supabase/schema.sql tabelas, segurança (RLS) e funções do banco
├── DEPLOY.md           guia de publicação
└── REFERENCIAS.md      mapa entre o jogo e as páginas do livro
```

## Criando uma nova fase

1. Copie `src/cases/fase2.js` para `src/cases/fase4.js` e ajuste o conteúdo (e-mail, quadros, perguntas, gabarito e referências).
2. Registre a fase em `src/cases/index.js`.
3. No `supabase/schema.sql`, inclua o novo id (`'fase4'`) nas duas listas de fases válidas (a tabela `resultados` e a função `registrar_nota`) e rode o SQL de novo.

Cada fase é só dados: o motor do jogo (janelas, evidências, correção, ranking) já está pronto.

## Aviso sobre conteúdo e direitos

- O **código-fonte** deste repositório está sob a licença MIT (veja [LICENSE](LICENSE)).
- O **conteúdo educativo** é um resumo, feito para fins didáticos, do livro de Crepaldi (2025). O livro continua protegido pelos direitos do autor e **não** é redistribuído aqui.
- O **nome e a logo Ezcopo** são a identidade visual da equipe e não estão cobertos pela licença MIT.
- Personagens, firmas, datas e quadros das fases são fictícios.

## Autoria

Projeto acadêmico desenvolvido por [@PedroLung](https://github.com/PedroLung) e equipe.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
