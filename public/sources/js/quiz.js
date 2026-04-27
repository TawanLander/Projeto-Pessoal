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
          <h3>${perguntas[i].nome}</h3>
          <div><img src="${perguntas[i].img}"></div>
            </div>
        <div class="opcoes">`

        for (let e = 0; e < filter.length; ++e) {
            let opcao = filter[e];
            // RADIO BUTTON - SÓ PODE TER UMA OPÇÃO ESCOLHIDA DE CADA VEZ! O NOME É O LET "I", RADIOS COM MESMO NOME NÃO PODEM SER SELECIONADOS AO MESMO TEMPO.
            msg += `
            <label class="opcao"> 
            <input type="radio" name="${i}">
            <span class="check"></span>
            ${opcao.nome}
          </label>`
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

        msg += `</div></div>`

        document.getElementById('quiz').innerHTML += msg;
    }
}

function passarPergunta(atual) {
    const pergunta = sessionStorage.getItem('pergunta');
    const div = document.getElementById(Number(pergunta));
    const proxima = document.getElementById(Number(pergunta) + 1);

    div.classList.add('sumir');
    div.classList.remove('aparecer');


    proxima.classList.add('aparecer');
    proxima.classList.remove('sumir');

    sessionStorage.setItem('pergunta', Number(pergunta) + 1);
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