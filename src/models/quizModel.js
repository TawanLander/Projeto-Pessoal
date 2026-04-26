var bd = require('../database/config');

function listarQuizes(){
    let query = 'select * from quiz order by avaliacao';
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

function cadastrar(nome){
    let query = `ìnsert into quizes values (?)`;

    return bd.executar(query, [nome]);
};


module.exports = {
    listarQuizes,
    listarPerguntas,
    listarOpcoes,
    cadastrar
};