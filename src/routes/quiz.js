var express = require('express');
var router = express.Router();

var controller = require('../controllers/quizController');

router.post('/cadastrar/quiz', (req, res) => { // ? ROTA PARA CADASTRAR SEU QUIZ
    controller.cadastrarQuiz(req, res);
});

router.post('/cadastrar/perguntas', (req, res) => { // ? ROTA PARA CADASTRAR AS PERGUNTAS
    controller.cadastrarPerguntas(req, res);
});

router.post('/cadastrar/opcoes', (req, res) => { // ? ROTA PARA CADASTRAR AS OPCOES
    controller.cadastrarOpcoes(req, res);
});

router.get('/', (req, res) => { // ? ROTA PARA PLOTAR OS QUIZES NO INDEX.HTML
    controller.listarQuizes(req, res);
});

router.post('/perguntas', (req, res) => { // ? ROTA PARA PLOTAR AS PERGUNTAS NA QUIZ.HTML
    let fk = Number(req.body.fkQuiz);
    controller.listarPerguntas(req, res, fk);
});

router.post('/opcoes', (req, res) => { // ? ROTA PARA PLOTAR AS OPCOES NA QUIZ.HTML
    let fk = Number(req.body.fkQuiz);
    controller.listarOpcoes(req, res, fk);
});

router.get('/informacao', (req, res) => { // ? ROTA PARA PEGAR O PRÓXIMO ID DO QUIZ (ESSENCIAL PARA CADASTRAR AS PERGUNTAS E OPÇÕES COM A FK)
    controller.listarInformacoes(req, res);
})

module.exports = router;