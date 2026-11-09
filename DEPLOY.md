# Publicar o Ezcopo de graça

O jogo é um site estático (HTML, CSS e JavaScript). O banco e o login ficam no Supabase, então basta hospedar a pasta `dist`.

## Antes de publicar (checklist)
- [ ] `.env.local` com a URL do projeto e a chave **pública** (`sb_publishable_...` ou `anon`). Nunca a chave secreta.
- [ ] SQL de `supabase/schema.sql` rodado no Supabase.
- [ ] "Confirm email" desligado no Supabase (Authentication > Providers > Email).
- [ ] (Opcional) música própria em `public/audio/musica.mp3`. Sem ela, o jogo usa a trilha ambiente gerada por ele.
- [ ] Jogo testado localmente com `npm run dev`.

## Opção A: Netlify, arrastando a pasta (a mais rápida)
1. No terminal, na pasta do projeto, gere a versão final:
   ```
   npm run build
   ```
   Isso cria a pasta `dist`. As variáveis do `.env.local` são embutidas nesse momento.
2. Abra https://app.netlify.com/drop e arraste a pasta **dist** para a página.
3. Crie a conta gratuita quando pedir (pode entrar com o Google ou o GitHub) para o site não expirar.
4. Em **Site configuration > Change site name**, escolha um nome curto, por exemplo `ezcopo`. O endereço fica `https://ezcopo.netlify.app` (se o nome já estiver em uso, tente `ezcopo-grupo`).
5. Para atualizar o jogo depois: rode `npm run build` de novo e arraste a pasta `dist` em **Deploys**.

## Opção B: Vercel com GitHub (atualiza sozinha a cada mudança)
1. Suba o projeto para um repositório no GitHub. O `.gitignore` já impede o envio do `.env.local`.
2. Em https://vercel.com, entre com o GitHub, clique em **Add New > Project** e importe o repositório. O Vercel reconhece o Vite sozinho.
3. Antes de clicar em Deploy, em **Environment Variables**, cadastre:
   - `VITE_SUPABASE_URL` = a URL do projeto Supabase
   - `VITE_SUPABASE_ANON_KEY` = a chave pública (publishable/anon)
4. Clique em Deploy. A cada `git push`, o site atualiza.

## Depois de publicar
1. No Supabase, em **Authentication > URL Configuration**, coloque o endereço do site em **Site URL** (e também em **Redirect URLs**).
2. Abra o endereço, crie uma conta de teste e jogue a Fase 1 para confirmar que a nota foi salva (Ranking e painel da professora).
3. Mande o link para a professora e para a turma.

## Se algo der errado
- **Tela de login dá erro:** confira se a chave é a pública e se o SQL foi rodado.
- **Site abre, mas não salva notas:** as variáveis `VITE_...` não chegaram ao build. Refaça o `npm run build` (Opção A) ou cadastre as variáveis e faça um novo deploy (Opção B).
- **Música não toca:** o navegador só libera som depois do primeiro clique. Clique em qualquer lugar e use o botão de música no canto.
