# Política de segurança

## Como reportar uma vulnerabilidade

Se você encontrou uma falha de segurança no Ezcopo, **não abra uma issue pública**.
Use o recurso **"Report a vulnerability"** na aba *Security* deste repositório (relato privado)
ou fale diretamente com a equipe pelo contato informado na política de privacidade do jogo.

Descreva o que encontrou, como reproduzir e qual o impacto. Vamos responder o mais rápido possível.

## O que está protegido

- Senhas são tratadas pelo Supabase Auth (com hash); o jogo nunca as vê nem as guarda.
- O banco usa Row Level Security: cada aluno só lê os próprios dados.
- Gravar nota, ver o ranking, excluir a conta e abrir o painel da professora só funcionam por funções do banco com permissão controlada.
- O papel de professor só pode ser concedido por quem administra o banco (Supabase).
- Chaves secretas nunca vão para o navegador: o jogo recusa uma chave secreta de propósito.

## Limitações conhecidas (projeto acadêmico)

- A correção das respostas acontece no navegador. Alguém com conhecimento técnico pode ler o gabarito
  ou enviar uma nota falsa. Isso é aceitável para um jogo de sala de aula e a professora vê tudo no painel.
- O cadastro não exige confirmação de e-mail, então contas falsas são possíveis.
