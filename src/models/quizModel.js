var bd = require('../database/config');

function listarInformacoes(){
    let query = 'select max(idQuiz) + 1  as id from quiz'
    return bd.executar(query);
}

function listarQuizes(){
    let query = `select quiz.*, usuario.nome, count(perguntas.id) as qtd
    from quiz 
    left join usuario on usuario.idUsuario = quiz.fkUsuario 
    join perguntas on perguntas.fkQuiz = quiz.idQuiz
    group by quiz.idQuiz
    order by quiz.gostados`;
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
    let query = `insert into quiz (idQuiz, titulo, imagem, genero, tipo, fkUsuario) values (?, ?, ?, ?, ?, ?)`;

    return bd.executar(query, [id, titulo, imagem, genero, tipo, fkUsuario]);
};

function cadastrarPerguntas(id, titulo, imagem, tipo, fkQuiz){
    let query = `insert into perguntas (id, titulo, imagem, tipo, fkQuiz) values (?, ?, ?, ?, ?)`;

    return bd.executar(query, [id, titulo, imagem, tipo, fkQuiz]);
}

function cadastrarOpcoes(id, fkPerguntas, fkQuiz, titulo, verdadeiro){
    let query = `insert into opcoes (id, fkPerguntas, fkQuiz, titulo, tipo) values (?, ?, ?, ?, ?)`;

    return bd.executar(query, [id, fkPerguntas, fkQuiz, titulo, verdadeiro]);
}

async function deletar(id){
    let query = `delete from quiz where idQuiz = ?`

    try {
        await bd.executar(query, [id]);

    } catch(e) {
        console.log(e)
        return;
    }   
}

function gostei(id){
    let query = 'update quiz set gostados = gostados + 1 where idQuiz = ?'

    return db.executar(query, [id]);
}

function terminar(idQuiz, idUsuario){
    let query = 'insert into quizes_completos (fkQuiz, fkUsuario) values (?, ?)'
    db.executar(query, [idQuiz, idUsuario]);
    
    query = 'insert into acertos'
}

module.exports = {
    listarInformacoes,
    listarQuizes,
    listarPerguntas,
    listarOpcoes,
    cadastrarQuiz,
    cadastrarPerguntas,
    cadastrarOpcoes,
    deletar
};