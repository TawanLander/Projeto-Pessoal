var quiz = require('../models/quizModel');

function listarInformacoes(req, res) {
    quiz.listarInformacoes().then(resultado => {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function listarQuizes(req, res) {
    quiz.listarQuizes().then(resultado => {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
};

function listarPerguntas(req, res, fk) {
    quiz.listarPerguntas(fk).then(resultado => {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
};

function listarOpcoes(req, res, fk) {
    quiz.listarOpcoes(fk).then(resultado => {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
};

function cadastrarQuiz(req, res) {
    let id = req.body.id;
    let titulo = req.body.titulo;
    let imagem = req.body.imagem;
    let genero = req.body.genero;
    let tipo = req.body.tipo;
    let fkUsuario = req.body.fkUsuario;

    if (titulo === undefined) {
        return res.status(400).send("Seu nome está incorreto");
    } else if (id === undefined) {
        return res.status(400).send("Seu id está incorreto")
    } else if (imagem === undefined) {
        return res.status(400).send("Sua imagem está incorreta")
    } else if (genero === undefined) {
        return res.status(400).send("Seu genero está incorreto")
    } else if (tipo === undefined) {
        return res.status(400).send("Seu tipo está incorreto")
    } else if (fkUsuario === undefined) {
        return res.status(400).send("Seu nomeUsuario está incorreto")
    }

    quiz.cadastrarQuiz(id, titulo, imagem, genero, tipo, fkUsuario).then(() => {
        return res.status(200).send("Quiz Criado!")
    }).catch(function (erro) {
        return res.status(500).json(erro.sqlMessage);
    });
};

function cadastrarPerguntas(req, res){
    let id = req.body.id;
    let titulo = req.body.titulo;
    let imagem = req.body.imagem;
    let tipo = req.body.tipo;
    let fkQuiz = req.body.fkQuiz;

    if(id === undefined){
        return res.status(400).send('Seu id está incorreto');
    } else if(titulo === undefined){
        return res.status(400).send('Seu título está incorreto');
    } else if(imagem === undefined){
        return res.status(400).send('Sua imagem está incorreta');
    } else if(tipo === undefined){
        return res.status(400).send('Seu tipo está incorreto');
    } else if(fkQuiz === undefined){
        return res.status(400).send('Seu fkQuiz está incorreto');
    }

    quiz.cadastrarPerguntas(id, titulo, imagem, tipo, fkQuiz).then(() => {
        return res.status(200).send('Pergunta criada')
    }).catch(e => {
        return res.status(500).json(e.sqlMessage);
    });
}

function cadastrarOpcoes(req, res){

}

module.exports = {
    listarInformacoes,
    listarQuizes,
    listarPerguntas,
    listarOpcoes,
    cadastrarQuiz,
    cadastrarPerguntas,
    cadastrarOpcoes
};