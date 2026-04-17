var express = require('express');
var router = express.Router();

var controller = require('../controllers/quizController');

router.post('./cadastrar', function (req, res) {
    controller.cadastrar(req, res);
});

router.post('./cadastrar', function (req, res) {
    controller.listar(req, res);
});

module.exports = router;