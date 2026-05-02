async function carregarElementos(janela){
    const sessao = await verificarSessao();

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    let headerMsg = '';

    headerMsg += `
        <div class="logo">
        <svg width="200" height="50" viewBox="0 0 200 60">
            <g transform="translate(10,10)">
                <path d="M15,5 Q20,0,30,5 T45,15 Q50,25,45,35 L40,40 Q30,50,20,40 L5,20 Q0,10,10,5 Z" fill="#4c4cff" />
                <path d="M22,18 L32,28 L42,10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
            </g>
            <text x="65" y="45" font-family="'Caveat Brush', cursive" font-size="40" fill="#fff">
                Gee<tspan fill="#4c4cff">Quiz</tspan>
            </text>
        </svg>
      </div>
      <div class="container" id="container-header">
        <!--Parte do INÍCIO-->
        <a id="index" class="a-resto" href="./index.html">Início</a>
          <!--Parte SOBRE MIM-->
        <a id="sobre" class="a-resto" href="./sobre.html">Sobre Mim</a>
          <!--Parte de LOGIN ou da CONTA-->` 

    if(sessao){
        headerMsg += `<a id="criarQuiz" href="./criarQuiz.html" class="a-resto">Criar Seu Quiz</a>
       <a id="conta" href="./conta.html" class="animation-header">Conta</a>`
    } else {
        headerMsg += `<a id="login" class="animation-header" href="./login.html">Login</a>`
    }
    header.innerHTML = headerMsg;

    footer.innerHTML = `&copy; 2026 Geequiz - Todos os Direitos Reservados <br> Dados para contato: <br> WhatsApp: 11 - 9191-0808 <br> Email: suporte@geequiz.com`

    marcarPaginaAtual(janela)
}

function marcarPaginaAtual(janela){
    if(janela === 'index'){
        document.getElementById('index').classList.add('atual')
    } else if(janela === 'sobre'){
        document.getElementById('sobre').classList.add('atual')
    } else if(janela === 'login'){
        document.getElementById('login').classList.add('atual')
    } else if(janela === 'conta'){
        document.getElementById('conta').classList.add('atual')
    } else if(janela === 'criarQuiz'){
        document.getElementById('criarQuiz').classList.add('atual')
    }
}