var database = require("../database/config")

function autenticar(email, senha) {
    let query = `
        SELECT id, nome, email, genero, timestampdiff(YEAR, dtNascimento, curdate()) as idade, senha, tipo FROM usuario WHERE email = ? AND senha = ?;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [email, senha]);
}

// Coloque os mesmos parâmetros aqui. Vá para a var query
function cadastrar(nome, email, genero, dtNascimento, senha) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    let query = `
        INSERT INTO usuario (nome, email, genero, dtNascimento, senha, tipo) VALUES (?, ?, ?, ?, ?, 'p');
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [nome, email, genero, dtNascimento, senha]);
}

function contarGenero(){
    let query = `select count(genero) from usuario group by genero`;
    return database.executar(query);
}

function contarIdade(){
    let query = `select case 
    when timestampdiff(YEAR, dtNascimento, curdate()) <= 9 THEN '0-9'
    when timestampdiff(YEAR, dtNascimento, curdate()) <= 19 THEN '10-19'
    when timestampdiff(YEAR, dtNascimento, curdate()) <= 29 THEN '20-29'
    when timestampdiff(YEAR, dtNascimento, curdate()) <= 39 THEN '30-39'
    when timestampdiff(YEAR, dtNascimento, curdate()) <= 49 THEN '40-49'
    when timestampdiff(YEAR, dtNascimento, curdate()) <= 59 THEN '50-59'
    when timestampdiff(YEAR, dtNascimento, curdate()) <= 79 THEN '60-79'
    else '80+'
    end as faixaEtaria,
    count(faixaEtaria)
    from usuario
    `
    return database.executar(query);
}

module.exports = {
    autenticar,
    cadastrar,
    contarGenero,
    contarIdade
};