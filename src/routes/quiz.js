const express = require('express');
const router = express.Router();


const array = require('../models/usuarioModel');
const controller = require('../controllers/quizController');

router.post('/cadastrar/quiz', (req, res) => { // ? ROTA PARA CADASTRAR SEU QUIZ // PRECISA DE TOKEN
    controller.cadastrarQuiz(req, res);
});

router.post('/cadastrar/perguntas', (req, res) => { // ? ROTA PARA CADASTRAR AS PERGUNTAS // PRECISA DE TOKEN
    controller.cadastrarPerguntas(req, res);
});

router.post('/cadastrar/opcoes', (req, res) => { // ? ROTA PARA CADASTRAR AS OPCOES // PRECISA DE TOKEN
    controller.cadastrarOpcoes(req, res);
});

router.get('/', (req, res) => { // ? ROTA PARA PLOTAR OS QUIZES NO INDEX.HTML
    controller.listarQuizes(req, res);
});

router.post('/perguntas', (req, res) => { // ? ROTA PARA PLOTAR AS PERGUNTAS NA QUIZ.HTML // PRECISA DE TOKEN
    let fk = Number(req.body.fkQuiz);
    controller.listarPerguntas(req, res, fk);
});

router.post('/opcoes', (req, res) => { // ? ROTA PARA PLOTAR AS OPCOES NA QUIZ.HTML // PRECISA DE TOKEN
    let fk = Number(req.body.fkQuiz);
    controller.listarOpcoes(req, res, fk);
});

router.get('/informacao', (req, res) => { // ? ROTA PARA PEGAR O PRÓXIMO ID DO QUIZ (ESSENCIAL PARA CADASTRAR AS PERGUNTAS E OPÇÕES COM A FK) // PRECISA DE TOKEN
    controller.listarInformacoes(req, res);
})

router.post('/deletar', (req, res) => {
    controller.deletar(req, res) // ? ROTA PARA DELETAR O QUIZ (SOMENTE ADMINISTRADORES) // PRECISA DE TOKEN
});

module.exports = router;