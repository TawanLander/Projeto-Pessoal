const tituloQuiz = document.getElementById('quiz-titulo');
const generoQuiz = document.getElementById('quiz-genero');
const tipoQuiz = document.getElementById('quiz-tipo');
const imgQuiz = document.getElementById('quiz-img');
const modificacoesQuiz = document.getElementById('quiz-modificacoes');

function montagemQuiz(i) {
    if (i === 1) {
        if(tituloQuiz.value != ''){
            let valor = (tituloQuiz.value).slice(0, 1).toUpperCase() + (tituloQuiz.value).slice(1);

            document.getElementById('titulo-quiz-template').innerHTML = valor;
        } else {
            document.getElementById('titulo-quiz-template').innerHTML = 'Insira o título';
        }
    } else if (i === 2) {
        if(generoQuiz.value != ''){
            document.getElementById('genero-quiz-template').innerHTML = `Tipo: ${tipoQuiz.value}`;
        } else {
            document.getElementById('genero-quiz-template').innerHTML = 'Insira o tipo'
        }
    } else if (i === 3) {
        if(tituloQuiz.value != ''){
            document.getElementById('tipo-quiz-template').innerHTML = `Gênero: ${generoQuiz.value}`;
        } else {
            document.getElementById('tipo-quiz-template').innerHTML = 'Insira o gênero';
        }
    } else if (i === 4) {
        document.getElementById('img-quiz-template').src = imgQuiz.value;
    } else {
        document.getElementById('nome-quiz-template').innerHTML = `Feito por: ${JSON.parse(sessionStorage.getItem('usuario')).nome}`
    }
}