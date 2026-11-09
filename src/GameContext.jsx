import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { CASOS } from './cases'
import { useAuth } from './AuthContext'
import { supabase } from './supabase'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [indiceCaso, setIndiceCaso] = useState(0)
  const caso = CASOS[indiceCaso]
  const temProximo = indiceCaso < CASOS.length - 1

  const [janelas, setJanelas] = useState([])
  const [fixados, setFixados] = useState([]) // [{ id, tipo, resumo }]
  const [topZ, setTopZ] = useState(1)
  const [abertos, setAbertos] = useState([]) // apps que o jogador já abriu alguma vez
  const [entregue, setEntregue] = useState(false)
  const [intro, setIntro] = useState(true) // tela de boas-vindas / briefing do caso
  const { usuario } = useAuth()
  const [tela, setTela] = useState('menu') // 'menu' ou 'jogo'
  const [painelMenu, setPainelMenu] = useState(null) // painel aberto no menu (ex.: 'ranking')
  const [notas, setNotas] = useState({}) // { idDaFase: melhor nota }
  const [resumoAberto, setResumoAberto] = useState(false)

  // Histórico do navegador: faz o botão "voltar" (e "avançar") andar entre menu, painéis e jogo,
  // em vez de sair do site. Cada mudança de tela/painel vira uma entrada no histórico.
  useEffect(() => {
    window.history.replaceState({ tela: 'menu', painel: null }, '')
    const aoVoltar = (e) => {
      if (e.state) {
        setTela(e.state.tela)
        setPainelMenu(e.state.painel)
      }
    }
    window.addEventListener('popstate', aoVoltar)
    return () => window.removeEventListener('popstate', aoVoltar)
  }, [])

  useEffect(() => {
    const atual = window.history.state
    if (atual && atual.tela === tela && atual.painel === painelMenu) return // já está no histórico
    window.history.pushState({ tela, painel: painelMenu }, '')
  }, [tela, painelMenu])

  // Ao entrar, carrega as notas já salvas do aluno e leva ele para a fase em que parou
  // (a primeira fase que ainda não tem nota). Se já fez todas, fica na última. Ao sair, limpa.
  useEffect(() => {
    if (!usuario || !supabase) {
      setNotas({})
      return
    }
    supabase
      .from('resultados')
      .select('fase, nota')
      .eq('user_id', usuario.id)
      .then(({ data }) => {
        if (!data) return
        const salvas = Object.fromEntries(data.map((r) => [r.fase, r.nota]))
        setNotas(salvas)

        const primeiraSemNota = CASOS.findIndex((c) => salvas[c.id] === undefined)
        setIndiceCaso(primeiraSemNota === -1 ? CASOS.length - 1 : primeiraSemNota)
        setJanelas([])
        setFixados([])
        setAbertos([])
        setEntregue(false)
        setIntro(true) // mostra o briefing da fase em que ele parou (o tutorial só aparece na Fase 1)
      })
  }, [usuario?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Guarda a melhor nota de cada fase (refazer o relatório não piora o resultado)
  // e, se o aluno estiver logado, salva no banco.
  const registrarNota = useCallback((idFase, total) => {
    setNotas((n) => ({ ...n, [idFase]: Math.max(n[idFase] ?? 0, total) }))
    if (usuario && supabase) {
      supabase.rpc('registrar_nota', { p_fase: idFase, p_nota: total }).then(({ error }) => {
        if (error) console.error('Não foi possível salvar a nota:', error.message)
      })
    }
  }, [usuario])

  // Volta para a Fase 1 e zera tudo
  const reiniciar = useCallback(() => {
    setIndiceCaso(0)
    setJanelas([])
    setFixados([])
    setAbertos([])
    setEntregue(false)
    setNotas({})
    setResumoAberto(false)
    setIntro(true)
    setTela('jogo')
  }, [])

  const abrir = useCallback((id) => {
    const novoZ = topZ + 1
    setTopZ(novoZ)
    setAbertos((a) => (a.includes(id) ? a : [...a, id]))
    setJanelas((js) => {
      const existe = js.find((j) => j.id === id)
      if (existe) return js.map((j) => (j.id === id ? { ...j, z: novoZ, minimizada: false } : j))
      return [...js, { id, z: novoZ, minimizada: false }]
    })
  }, [topZ])

  const fechar = useCallback((id) => setJanelas((js) => js.filter((j) => j.id !== id)), [])

  const focar = useCallback((id) => {
    const novoZ = topZ + 1
    setTopZ(novoZ)
    setJanelas((js) => js.map((j) => (j.id === id ? { ...j, z: novoZ } : j)))
  }, [topZ])

  const minimizar = useCallback(
    (id) => setJanelas((js) => js.map((j) => (j.id === id ? { ...j, minimizada: !j.minimizada } : j))),
    [],
  )

  const alternarFixo = useCallback((item) => {
    setFixados((fs) => (fs.some((f) => f.id === item.id) ? fs.filter((f) => f.id !== item.id) : [...fs, item]))
  }, [])

  // Uma fase está liberada se for a primeira ou se a anterior já tem nota (mantém a sequência)
  const faseLiberada = useCallback(
    (i) => i === 0 || notas[CASOS[i - 1].id] !== undefined,
    [notas],
  )

  // Começa (ou refaz) a fase escolhida no menu. Fases com cadeado não abrem.
  const irParaFase = useCallback((i) => {
    if (!faseLiberada(i)) return
    setIndiceCaso(i)
    setJanelas([])
    setFixados([])
    setAbertos([])
    setEntregue(false)
    setIntro(true)
    setTela('jogo')
  }, [faseLiberada])

  // Vai para o próximo caso e zera tudo que era do caso anterior
  const proximoCaso = useCallback(() => {
    if (indiceCaso >= CASOS.length - 1) return
    setIndiceCaso(indiceCaso + 1)
    setJanelas([])
    setFixados([])
    setAbertos([])
    setEntregue(false)
    setIntro(true)
  }, [indiceCaso])

  // Estado que as missões do caso consultam
  const estadoMissao = useMemo(
    () => ({
      entregue,
      abriu: (id) => abertos.includes(id),
      fixou: (id) => fixados.some((f) => f.id === id),
    }),
    [entregue, abertos, fixados],
  )

  const missoes = (caso.missoes || []).map((m) => ({ ...m, concluida: m.feito(estadoMissao) }))
  const missaoAtual = missoes.find((m) => !m.concluida) || null

  const valor = {
    caso, janelas, abrir, fechar, focar, minimizar,
    fixados, alternarFixo,
    missoes, missaoAtual,
    abertos,
    marcarEntregue: () => setEntregue(true),
    intro, setIntro,
    temProximo, proximoCaso,
    notas, registrarNota, resumoAberto, setResumoAberto, reiniciar,
    tela, setTela, painelMenu, setPainelMenu,
    indiceCaso, faseLiberada, irParaFase,
  }
  return <GameContext.Provider value={valor}>{children}</GameContext.Provider>
}

export function useGame() {
  return useContext(GameContext)
}
