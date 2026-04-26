var quiz = require('../models/quizModel');

function listarQuizes(req, res) {
    quiz.listarQuizes().then(resultado => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
};

function listarPerguntas(req, res, fk) {
    quiz.listarPerguntas(fk).then(resultado => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
};

function listarOpcoes(req, res, fk) {
    quiz.listarOpcoes(fk).then(resultado => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
};

function cadastrar(req, res){
    var nome = req.body.nome;

    if(nome === undefined){
        res.status(400).send("Seu nome está incorreto");
    };

    quiz.cadastrar(nome).then(function(resposta){
        res.status(200).send("Quiz Criado!")
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
};

module.exports = {
    listarQuizes,
    listarPerguntas,
    listarOpcoes,
    cadastrar

};