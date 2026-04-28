const sessao = JSON.parse(sessionStorage.getItem('usuario'));

function obterDados() {
    fetch('/quizes').then(response => {
        if (response.ok) {
            response.json().then(r => {
                plotarDados(r)
            })
        } else {
            console.error('Erro na coleta de dados PLOTAR.JS')
        }
    })
}

function plotarDados(r) {
    const divQuizes = document.getElementById('div-quizes');
    
    r.forEach(item => {
        console.log(item);
    let msg = '';
    if(sessao){
        msg += `<div class="quiz" onclick="salvarDados(${item.idQuiz})">`
    } else {
        msg += `<div class="quiz" onclick="window.location='./login.html'">`
    }

    msg += `
    <div><img src="${item.imagem}"></div>
    <div class="geral"><h1>${item.titulo}</h1>
    <div class="content">Gênero: ${item.genero}</div>
    <div class="content">Tipo: ${item.tipo}</div>
    <div class="content">Quantidade de Perguntas: 10</div>
    <div class="content">Avaliação: 4.5</div>
    `

    if(item.fkUsuario != null){
        msg += `<div class="content">Feito por: ${item.nome}</div></div>`
    } else {
     msg += `<div class="content">Feito por: GeeQuiz</div></div>`   
    }

    msg += `</div>`

    divQuizes.innerHTML += msg;
    });
}