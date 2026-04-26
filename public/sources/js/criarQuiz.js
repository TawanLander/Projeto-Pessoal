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
        document.getElementById('genero-quiz-template').innerHTML = `Gênero: ${generoQuiz.value}`;
    } else if (i === 3) {
        document.getElementById('tipo-quiz-template').innerHTML = `Tipo: ${tipoQuiz.value}`;
    } else if (i === 4) {
        document.getElementById('img-quiz-template').src = imgQuiz.value;
    } else {
        document.getElementById('nome-quiz-template').innerHTML = `Feito por: ${JSON.parse(sessionStorage.getItem('usuario')).nome}`
    }
}

function criarQuiz(){

}

function prosseguirPerguntas(o){
    if(o === 'i'){
        document.getElementById('criar-quiz').classList.add('sumir');
        document.getElementById('criar-perguntas').classList.remove('sumir');
        adicionarPergunta()
    } else {
        document.getElementById('criar-quiz').classList.remove('sumir');
        document.getElementById('criar-perguntas').classList.add('sumir');
    }
}

function adicionarPergunta(){
    const pergunta = document.getElementById('criar-perguntas');

    pergunta.innerHTML += ``
}