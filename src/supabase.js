import { createClient } from '@supabase/supabase-js'

// URL e chave PÚBLICA ficam no arquivo .env.local (veja supabase/schema.sql).
// Use a chave "publishable" (sb_publishable_...) ou a "anon" (eyJ...). A chave pública é segura
// no navegador porque quem protege os dados são as regras do banco (RLS).
// NUNCA use a chave secreta (sb_secret_... ou service_role): ela dá acesso total ao banco.
const url = import.meta.env.VITE_SUPABASE_URL
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY

const chaveSecreta = Boolean(chave) && (chave.startsWith('sb_secret_') || chave.startsWith('sb_sec'))

export const problemaConfig = chaveSecreta
  ? 'A chave no .env.local é a chave SECRETA. Troque pela chave pública (sb_publishable_... ou anon) e reinicie o npm run dev.'
  : null

// Com chave secreta o cliente nem é criado, para ela não ser usada no navegador.
export const configurado = Boolean(url && chave) && !chaveSecreta
export const supabase = configurado ? createClient(url, chave) : null
