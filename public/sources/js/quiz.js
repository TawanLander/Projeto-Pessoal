const divQuiz = document.getElementById('quiz');

function salvarDados(id) {
    sessionStorage.setItem(`quiz`, id)
    window.location = './quiz.html'
};

function pegarDados() {
    let quiz = sessionStorage.getItem('quiz');

    fetch('/quizes/perguntas', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkQuiz: quiz
        })
    }).then(response => {
        if (response.ok) {
            response.json().then(perguntas => {
                fetch('/quizes/opcoes', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fkQuiz: quiz
                    })
                }).then(response => {
                    response.json().then(opcoes => {
                        plotarPerguntas(perguntas, opcoes);
                    })
                })
            })
        } else {
            console.error('Erro no fetch QUIZ.JS')
        }
    })
    //sessionStorage.removeItem('quiz');
}

function plotarPerguntas(perguntas, opcoes) {
    // let final = document.querySelector('.terminar') // ! COLOCANDO A IMAGEM DA CAPA DO QUIZ NO FUNDO DA PARTE TERMINAR DO QUIZ
    // console.log(final)
    // final.style.backgroundImage = `url()`;

    sessionStorage.setItem('pergunta', 0);

    for (let i = 0; i < perguntas.length; ++i) {
        let filter = opcoes.filter(opcao => opcao.fkPerguntas === perguntas[i].id);
        let msg = '';
        if (i === 0) {
            msg += `<div id="${i}" ><div class="pergunta">`
        } else {
            msg += `<div id="${i}" class="sumir"><div class="pergunta">`

        }
        msg += `
          <h3>${perguntas[i].titulo}</h3>
          <div><img src="${perguntas[i].imagem}"></div>
            </div>
        <div class="opcoes">`
        for (let e = 0; e < filter.length; ++e) {
            let opcao = filter[e];
            // RADIO BUTTON - SÓ PODE TER UMA OPÇÃO ESCOLHIDA DE CADA VEZ! O NOME É O LET "I", RADIOS COM MESMO NOME NÃO PODEM SER SELECIONADOS AO MESMO TEMPO.
            if (perguntas.tipo === 'n') {
                msg += `
                <label class="opcao"> 
                <input type="radio" name="${i}" value="${opcao.tipo}">
                <span class="check"></span>
                ${opcao.titulo}
              </label>`
            } else {
                msg += `
                <label class="opcao"> 
                <input type="checkbox" name="${i}" value="${opcao.tipo}">
                <span class="check"></span>
                ${opcao.titulo}
              </label>`
            }
        }
        msg += `</div><div class="guias">`

        if (i != 0) {
            msg += `<button onclick="voltarPergunta()" class="voltar">Voltar Pergunta</button>`
        }
        if (i != perguntas.length - 1) {
            msg += `<button onclick="passarPergunta()" class="passar">Próxima Pergunta</button>`
        } else {
            msg += `<button onclick="terminarQuiz()" class="passar">Terminar Quiz</button>`
        }

        msg += `</div><div class="erro sumir">Selecione ao menos uma opção!</div></div>`

        document.getElementById('quiz').innerHTML += msg;
    }
}

function passarPergunta(atual) {
    contarPontuacao()
    const pergunta = sessionStorage.getItem('pergunta');
    const erro = document.querySelectorAll('.erro');

    if (document.querySelectorAll(`[name="${pergunta}"]:checked`).length <= 0) {
        erro[pergunta].classList.remove('sumir');
        erro[pergunta].classList.add('aparecer');
        return false;
    };
    erro[pergunta].classList.remove('aparecer');
    erro[pergunta].classList.add('sumir');

    const div = document.getElementById(Number(pergunta));
    const proxima = document.getElementById(Number(pergunta) + 1);

    div.classList.add('sumir');
    div.classList.remove('aparecer');


    proxima?.classList.add('aparecer');
    proxima?.classList.remove('sumir');

    sessionStorage.setItem('pergunta', Number(pergunta) + 1);
    return true;
}

function voltarPergunta(atual) {
    const pergunta = sessionStorage.getItem('pergunta');
    const div = document.getElementById(Number(pergunta));
    const anterior = document.getElementById(Number(pergunta) - 1);

    div.classList.add('sumir');
    div.classList.remove('aparecer');


    anterior.classList.add('aparecer');
    anterior.classList.remove('sumir');

    sessionStorage.setItem('pergunta', Number(pergunta) - 1);
}

const pontuacao = [];

function contarPontuacao() {
    let pergunta = JSON.parse(sessionStorage.getItem('pergunta'));

    let opcaoSelecionado = document.querySelectorAll(`[name="${pergunta}"]:checked`);
    let paraAcertar;
    let acertos = 0;

    for (let i = 0; i < opcaoSelecionado.length; ++i) {

        if (opcaoSelecionado[i].value === '1') {
            acertos++
        } else {
            acertos--;
        }
    }

    if (acertos < 0) acertos = 0;

    let pctg = 0;

    let opcoes = document.querySelectorAll(`[name="${pergunta}"]`)

    opcoes.forEach(i => {
        pctg += Number(i.value);
    })

    let pontuacaoFinal = acertos / pctg;

    pontuacao.push({ pontuacao: pontuacaoFinal, acertos: [] });

    opcoes.forEach(i => {
        let acerto = false;
        if (i.checked) {
            acerto = true
        }
        pontuacao[pontuacao.length - 1].acertos.push({ selecionou: acerto, valor: i.value})
    })
}

function terminarQuiz() {
    const resultado = passarPergunta()
    if(!resultado) return;

    const e = document.getElementById('quiz').classList.add('sumir')

    // FAZENDO A ÚLTIMA PERGUNTA SUMIR AO CLICAR EM TERMINAR
    const final = document.querySelector('.terminar');
    const elemento = document.getElementById('pontuacao');
    const maxima = document.getElementById('maxima');

    let soma = 0;

    for (let i = 0; i < pontuacao.length; ++i) {
        soma += Number(pontuacao[i].pontuacao);
    }

    elemento.innerHTML = soma;
    maxima.innerHTML = Number(sessionStorage.getItem('pergunta'));

    final.classList.remove('sumir');
    final.classList.add('aparecer');
}

function verDetalhes() {
    let div = document.getElementById('detalhes');
    let msg = ''
    for (let i = 0; i < Number(sessionStorage.getItem('pergunta')); ++i) {

        msg += `<div class="detalhando"><span>Pergunta: ${i + 1}</span> <span>Pontuacao: ${pontuacao[i].pontuacao}</span>`

        for (let e = 0; e < pontuacao[i].acertos.length; ++e) {
            let certo = 'Errou';
            let acertos = pontuacao[i].acertos[e];
            if (acertos.selecionou && acertos.valor === '1') {
                certo = 'Acertou'
            } else if(!acertos.selecionou && acertos.valor === '0'){
                certo = 'Acertou'
            };

            msg += `<span>Acertos: ${certo}</span>`
        }
        msg += `</div>`
    }

    div.innerHTML = msg
}