var express = require('express');
var router = express.Router();

var controller = require('../controllers/quizController');

router.post('/cadastrar', function (req, res) {
    controller.cadastrar(req, res);
});

router.get('/', (req, res) => {
    controller.listarQuizes(req, res);
});

router.post('/perguntas', (req, res) => {
    let fk = Number(req.body.fkQuiz);
    controller.listarPerguntas(req, res, fk);
});

router.post('/opcoes', (req, res) => {
    let fk = Number(req.body.fkQuiz);
    controller.listarOpcoes(req, res, fk);
});

module.exports = router;