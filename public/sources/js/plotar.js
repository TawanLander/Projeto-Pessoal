const sessao = JSON.parse(sessionStorage.getItem('usuario'));

function obterDados() {
    fetch('/quizes').then(response => {
        if (response.ok) {
            response.json().then(r => {
                r.reverse();

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
    let msg = '';
    if(sessao){
        msg += `<div class="quiz" onclick="salvarDados(${item.id})">`
    } else {
        msg += `<div class="quiz" onclick="window.location='./login.html'">`
    }

    if(item.img != null){
        msg += `<div><img src="${item.img}"></div>`

    }
    msg += `
    <div class="geral"><h1>${item.nome}</h1>
    <div class="content">De: ${item.tipo}</div>
    <div class="content">Tipo: ${item.tipo}</div>
    <div class="content">Quantidade de Perguntas: 10</div>
    <div class="content">Avaliação: 4.5</div>
    `

    if(item.fkUsuario != null){
        msg += `<div class="content">Feito por: ${item.fkUsuario}</div></div>`
    } else {
     msg += `<div class="content">Feito por: GeeQuiz</div></div>`   
    }

    msg += `</div>`

    divQuizes.innerHTML += msg;
    });
}