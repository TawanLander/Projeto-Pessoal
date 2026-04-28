var bd = require('../database/config');

function listarInformacoes(){
    let query = 'select max(idQuiz) + 1 from quiz'
    return bd.executar(query);
}

function listarQuizes(){
    let query = 'select quiz.*, usuario.nome from quiz left join usuario on usuario.idUsuario = quiz.fkUsuario order by quiz.avaliacao';
    return bd.executar(query);
}

function listarPerguntas(fk){
    let query = `select * from perguntas where ? = fkQuiz`;
    return bd.executar(query, [fk]);
}

function listarOpcoes(fk){
    let query = `select * from opcoes where ? = fkQuiz`;
    return bd.executar(query, [fk]);
}

function cadastrarQuiz(id, titulo, imagem, genero, tipo, fkUsuario){
    let query = `insert into quiz (id, titulo, imagem, genero, tipo, fkUsuario) values (?, ?, ?, ?, ?, ?)`;

    return bd.executar(query, [id, titulo, imagem, genero, tipo, fkUsuario]);
};

function cadastrarPerguntas(id, titulo, imagem, tipo, fkQuiz){
    let query = `insert into perguntas (id, titulo, imagem, tipo, fkQuiz) values (?, ?, ?, ?, ?)`;

    return bd.executar(query, [id, titulo, imagem, tipo, fkQuiz]);
}

function cadastrarOpcoes(){
    let query = ``;

    return bd.executar(query, []);
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