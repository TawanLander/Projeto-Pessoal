const express = require('express');
const router = express.Router();


const array = require('../models/usuarioModel');
const controller = require('../controllers/quizController');

router.post('/cadastrar/quiz', (req, res) => { // ? ROTA PARA CADASTRAR SEU QUIZ // PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    let fkUsuario = user.id;
    controller.cadastrarQuiz(req, res, fkUsuario);

});

router.post('/cadastrar/perguntas', (req, res) => { // ? ROTA PARA CADASTRAR AS PERGUNTAS // PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    controller.cadastrarPerguntas(req, res);
});

router.post('/cadastrar/opcoes', (req, res) => { // ? ROTA PARA CADASTRAR AS OPCOES // PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    controller.cadastrarOpcoes(req, res);
});

router.get('/', (req, res) => { // ? ROTA PARA PLOTAR OS QUIZES NO INDEX.HTML
    controller.listarQuizes(req, res);
});

router.post('/perguntas', (req, res) => { // ? ROTA PARA PLOTAR AS PERGUNTAS NA QUIZ.HTML // PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    controller.listarPerguntas(req, res);
});

router.post('/opcoes', (req, res) => { // ? ROTA PARA PLOTAR AS OPCOES NA QUIZ.HTML // PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    controller.listarOpcoes(req, res);
});

router.get('/informacao', (req, res) => { // ? ROTA PARA PEGAR O PRÓXIMO ID DO QUIZ (ESSENCIAL PARA CADASTRAR AS PERGUNTAS E OPÇÕES COM A FK) // PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    controller.listarInformacoes(req, res);
})

router.post('/deletar', (req, res) => {
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    if (user.cargo === 'a') {
        controller.deletar(req, res) // ? ROTA PARA DELETAR O QUIZ (SOMENTE ADMINISTRADORES) // PRECISA DE TOKEN
    } else {
        return res.status(400).send('Você não possui permissões!')
    }
});

router.get('/gostei', (req, res) => {
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    controller.gostei(req, res);
});

router.post('/terminar', (req, res) => {
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    const idUsuario = user.id;

    controller.terminar(req, res, idUsuario);
})

module.exports = router;