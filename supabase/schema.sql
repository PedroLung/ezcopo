-- Ezcopo: esquema do banco (Supabase / PostgreSQL)
--
-- COMO USAR: no painel do Supabase, abra "SQL Editor" > "New query",
-- cole este arquivo inteiro e clique em "Run". Pode rodar mais de uma vez.
--
-- O login (e-mail e senha) é feito pelo Supabase Auth. A senha NUNCA passa pelo jogo
-- nem fica nas nossas tabelas. Aqui ficam só o nick, o papel (aluno/professor) e as notas.

-- 1) TABELAS -----------------------------------------------------------------

create table if not exists public.profiles (
  id        uuid primary key references auth.users (id) on delete cascade,
  nick      text not null,
  role      text not null default 'aluno' check (role in ('aluno', 'professor')),
  criado_em timestamptz not null default now()
);

-- nick único, sem diferenciar maiúsculas de minúsculas
create unique index if not exists profiles_nick_unico on public.profiles (lower(nick));

-- melhor nota de cada aluno em cada fase
create table if not exists public.resultados (
  user_id       uuid not null references public.profiles (id) on delete cascade,
  fase          text not null check (fase in ('fase1', 'fase2', 'fase3')),
  nota          int  not null check (nota between 0 and 100),
  atualizado_em timestamptz not null default now(),
  primary key (user_id, fase)
);

-- 2) SEGURANÇA (RLS): cada aluno só enxerga os próprios dados ---------------

alter table public.profiles   enable row level security;
alter table public.resultados enable row level security;

create or replace function public.is_professor()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'professor')
$$;

drop policy if exists "ver proprio perfil" on public.profiles;
create policy "ver proprio perfil" on public.profiles
  for select using (id = auth.uid() or public.is_professor());

drop policy if exists "ver proprios resultados" on public.resultados;
create policy "ver proprios resultados" on public.resultados
  for select using (user_id = auth.uid() or public.is_professor());

-- Não há policy de insert/update/delete: o jogo só grava notas pela função registrar_nota().

-- 3) CRIA O PERFIL AUTOMATICAMENTE QUANDO O ALUNO SE CADASTRA ----------------

create or replace function public.novo_usuario()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nick)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'nick'), ''), split_part(new.email, '@', 1))
  );
  return new;
end
$$;

drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.novo_usuario();

-- 4) FUNÇÕES USADAS PELO JOGO -------------------------------------------------

-- o nick está livre? (usada na tela de cadastro, antes de criar a conta)
create or replace function public.nick_disponivel(p_nick text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select not exists (select 1 from public.profiles where lower(nick) = lower(trim(p_nick)))
$$;

-- grava a nota de uma fase, mantendo sempre a MELHOR nota do aluno
create or replace function public.registrar_nota(p_fase text, p_nota int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'não autenticado';
  end if;
  if p_fase not in ('fase1', 'fase2', 'fase3') or p_nota < 0 or p_nota > 100 then
    raise exception 'dados inválidos';
  end if;

  insert into public.resultados (user_id, fase, nota)
  values (auth.uid(), p_fase, p_nota)
  on conflict (user_id, fase) do update
    set nota = greatest(public.resultados.nota, excluded.nota),
        atualizado_em = case
          when excluded.nota > public.resultados.nota then now()
          else public.resultados.atualizado_em
        end;
end
$$;

-- ranking geral (só nick e pontos; não mostra e-mail). Desempate: quem chegou primeiro.
create or replace function public.ranking()
returns table (nick text, total bigint, fases bigint, ultima timestamptz)
language sql
security definer
set search_path = public
stable
as $$
  select p.nick, sum(r.nota)::bigint, count(*)::bigint, max(r.atualizado_em)
  from public.resultados r
  join public.profiles p on p.id = r.user_id
  where p.role = 'aluno'
  group by p.nick
  order by sum(r.nota) desc, max(r.atualizado_em) asc
  limit 100
$$;

-- painel da professora: todos os alunos, e-mail e notas (só funciona para role = 'professor')
create or replace function public.painel_professor()
returns table (nick text, email text, fase text, nota int, atualizado_em timestamptz)
language plpgsql
security definer
set search_path = public
stable
as $$
begin
  if not public.is_professor() then
    raise exception 'acesso negado';
  end if;
  return query
    select p.nick, u.email::text, r.fase, r.nota, r.atualizado_em
    from public.profiles p
    join auth.users u on u.id = p.id
    left join public.resultados r on r.user_id = p.id
    where p.role = 'aluno'
    order by p.nick, r.fase;
end
$$;

-- 5) PERMISSÕES DAS FUNÇÕES ---------------------------------------------------

revoke all on function public.registrar_nota(text, int) from public, anon;
revoke all on function public.ranking()                 from public, anon;
revoke all on function public.painel_professor()        from public, anon;
grant execute on function public.registrar_nota(text, int) to authenticated;
grant execute on function public.ranking()                 to authenticated;
grant execute on function public.painel_professor()        to authenticated;
grant execute on function public.nick_disponivel(text)     to anon, authenticated;

-- 6) COMO TORNAR A PROFESSORA "PROFESSOR" ----------------------------------------
-- Primeiro a professora cria a conta normalmente no jogo (com o nick dela).
-- Depois, rode isto no SQL Editor, trocando o nick:
--
--   update public.profiles set role = 'professor' where lower(nick) = lower('NICK_DA_PROFESSORA');
