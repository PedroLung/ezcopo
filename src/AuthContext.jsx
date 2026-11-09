import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, configurado } from './supabase'

const AuthContext = createContext(null)

// Traduz os erros mais comuns do Supabase para português
function traduzir(erro) {
  const m = (erro?.message || '').toLowerCase()
  if (m.includes('invalid login')) return 'E-mail ou senha incorretos.'
  if (m.includes('already registered') || m.includes('already been registered')) return 'Este e-mail já está cadastrado. Use "Entrar".'
  if (m.includes('at least 6')) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (m.includes('invalid email') || m.includes('unable to validate email')) return 'E-mail inválido.'
  if (m.includes('rate limit')) return 'Muitas tentativas. Espere um pouco e tente de novo.'
  if (m.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar.'
  if (m.includes('fetch') || m.includes('network')) return 'Sem conexão com o servidor. Verifique a internet.'
  // Mostra o motivo real para facilitar descobrir o problema (ex.: SQL ainda não rodado)
  console.error('Erro do Supabase:', erro)
  if (m.includes('nick_disponivel') || m.includes('schema cache') || m.includes('could not find the function')) {
    return 'O banco ainda não foi preparado. Rode o arquivo supabase/schema.sql no SQL Editor do Supabase.'
  }
  return `Algo deu errado: ${erro?.message || 'erro desconhecido'}`
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null) // { id, email, nick, role }
  const [carregando, setCarregando] = useState(configurado)

  const carregarPerfil = useCallback(async (user) => {
    if (!user) {
      setUsuario(null)
      return
    }
    const { data } = await supabase.from('profiles').select('nick, role').eq('id', user.id).maybeSingle()
    setUsuario({
      id: user.id,
      email: user.email,
      nick: data?.nick ?? user.email.split('@')[0],
      role: data?.role ?? 'aluno',
    })
  }, [])

  useEffect(() => {
    if (!configurado) return
    supabase.auth.getSession().then(async ({ data }) => {
      await carregarPerfil(data.session?.user)
      setCarregando(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, sessao) => {
      // Adiado de propósito: chamar o banco direto aqui dentro pode travar o login.
      setTimeout(() => carregarPerfil(sessao?.user), 0)
    })
    return () => sub.subscription.unsubscribe()
  }, [carregarPerfil])

  async function entrar(email, senha) {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    return error ? { erro: traduzir(error) } : {}
  }

  async function cadastrar(nick, email, senha) {
    const { data: livre, error: e1 } = await supabase.rpc('nick_disponivel', { p_nick: nick })
    if (e1) return { erro: traduzir(e1) }
    if (!livre) return { erro: 'Este nick já está em uso. Escolha outro.' }

    const { data, error } = await supabase.auth.signUp({ email, password: senha, options: { data: { nick } } })
    if (error) return { erro: traduzir(error) }
    if (!data.session) return { aviso: 'Conta criada! Confirme seu e-mail para entrar.' }
    return {}
  }

  async function sair() {
    await supabase.auth.signOut()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ configurado, usuario, carregando, entrar, cadastrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
