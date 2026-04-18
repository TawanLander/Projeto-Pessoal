var bd = require('../database/config');

function listar(){
    let query = 'SELECT * FROM quizes';
    return bd.executar(query);
}


function cadastrar(nome){
    let query = `ìnsert into quizes values (?)`;

    return bd.executar(query, [nome]);
};


module.exports = [
    listar,
    listar
];