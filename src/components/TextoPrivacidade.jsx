import { CONTATO, PRAZO, POLITICA_VERSAO } from '../privacidade'

// Política de privacidade em linguagem simples (baseada na Lei nº 13.709/2018, a LGPD).
export default function TextoPrivacidade() {
  return (
    <div className="politica">
      <h4>Quem somos</h4>
      <p>
        O Ezcopo é um jogo educativo criado como trabalho acadêmico. Quem responde pelos seus dados é a equipe
        do projeto. Para qualquer dúvida sobre seus dados, fale com {CONTATO}.
      </p>

      <h4>Quais dados coletamos</h4>
      <ul>
        <li><b>Nick</b>: o nome que aparece no ranking. Não precisa ser seu nome real.</li>
        <li>
          <b>E-mail</b>: usado para entrar no jogo e aparece para a professora junto com suas notas. Você não precisa
          usar seu e-mail pessoal: pode ser um e-mail secundário ou de teste.
        </li>
        <li><b>Senha</b>: fica criptografada no serviço de login. Nem a equipe consegue ver.</li>
        <li><b>Notas</b>: a melhor nota de cada fase e a data.</li>
        <li><b>Aceite desta política</b>: a data e a versão que você aceitou.</li>
      </ul>
      <p>
        Não coletamos nome completo, CPF, telefone, localização nem usamos publicidade. As escolhas de música e
        efeitos sonoros ficam só no seu navegador.
      </p>

      <h4>Para que usamos</h4>
      <p>Para você entrar no jogo, salvar seu progresso, aparecer no ranking e para a professora acompanhar o desempenho da turma.</p>

      <h4>Quem pode ver</h4>
      <ul>
        <li><b>Você</b>: todos os seus dados.</li>
        <li><b>Outros jogadores</b>: só seu nick e sua pontuação, no ranking.</li>
        <li><b>A professora</b>: nick, e-mail e notas.</li>
        <li><b>Supabase</b>: serviço em nuvem que guarda os dados e faz o login para nós (operador de dados).</li>
      </ul>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para outros fins.</p>

      <h4>Base legal</h4>
      <p>Seu <b>consentimento</b>, dado ao criar a conta (LGPD, art. 7º, inciso I). Você pode retirá-lo a qualquer momento excluindo sua conta.</p>

      <h4>Por quanto tempo guardamos</h4>
      <p>{PRAZO}. Depois disso, os dados são apagados. Você pode pedir a exclusão antes, quando quiser.</p>

      <h4>Seus direitos</h4>
      <p>
        Você pode confirmar que tratamos seus dados, acessá-los, corrigi-los, baixá-los e pedir a eliminação. Em
        "Privacidade e meus dados" você baixa seus dados e exclui sua conta na hora. Para corrigir nick ou e-mail,
        ou para qualquer outro pedido, fale com {CONTATO}.
      </p>

      <h4>Segurança e localização dos dados</h4>
      <p>
        A conexão é protegida (HTTPS), o acesso é controlado por regras no banco e cada aluno só vê os próprios
        dados. O Supabase pode armazenar os dados em servidores fora do Brasil, conforme a região do projeto
        (LGPD, art. 33).
      </p>

      <p className="politica-versao">Versão {POLITICA_VERSAO} da política de privacidade.</p>
    </div>
  )
}
