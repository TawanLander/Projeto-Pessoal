var database = require("../database/config")
const usuariosLogados = [];

function gerarToken() {
    const t1 = Math.random();
    const t2 = Math.random();

    const operacao = Math.random();

    let r1;

    if (operacao < 0.25) {
        r1 = t1 + t2;
    } else if (operacao < 0.5) {
        r1 = t1 - t2;
    } else if (operacao < 0.75) {
        r1 = t1 * t2;
    } else {
        r1 = t1 / t2;
    }
    let token = (r1 * new Date().getSeconds()).toString();

    function inserirNoMeio(valor, posicao, caracter) {
        return valor.slice(0, posicao) + caracter + valor.slice(posicao)
    }

    const letrasMaiusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const letrasMinusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const caracteresEspeciais = ['!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '/', '?', '>', '<', ',', '.', '~', '^', '`', ':', ';', '§', '°', 'ª', 'º', '£', '¢', '¬', '¤', '±', '©', '®', '÷', '«', '»', '¿', '¡', 'ç', 'Ç', 'ã', 'Ã', 'õ', 'Õ', 'á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'â', 'Â', 'ê', 'Ê', 'î', 'Î', 'ô', 'Ô', 'û', 'Û', 'à', 'À', 'ü', 'Ü'];

    const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    for (let i = 0; i < 30; ++i) {
        const letraAInserir = Math.floor(Math.random() * letrasMaiusculas.length);
        const lugarAInserir = Math.floor(Math.random() * token.length);

        token = inserirNoMeio(token, lugarAInserir, letrasMaiusculas[letraAInserir]);
    };

    for (let i = 0; i < 30; ++i) {
        const letraAInserir = Math.floor(Math.random() * letrasMinusculas.length);
        const lugarAInserir = Math.floor(Math.random() * token.length);

        token = inserirNoMeio(token, lugarAInserir, letrasMinusculas[letraAInserir]);
    }

    for (let i = 0; i < 30; ++i) {
        const letraAInserir = Math.floor(Math.random() * caracteresEspeciais.length);
        const lugarAInserir = Math.floor(Math.random() * token.length);

        token = inserirNoMeio(token, lugarAInserir, caracteresEspeciais[letraAInserir]);
    }

    for (let i = 0; i < 30; ++i) {
        const letraAInserir = Math.floor(Math.random() * numeros.length);
        const lugarAInserir = Math.floor(Math.random() * token.length);

        token = inserirNoMeio(token, lugarAInserir, numeros[letraAInserir]);
    }

    return token;
}

async function autenticar(email, senha) {
    let query = `
        SELECT idUsuario, nome, email, identidade, timestampdiff(YEAR, dtNascimento, curdate()) as idade, senha, cargo FROM usuario WHERE email = ? AND senha = ?;
    `;

    console.log("Executando a instrução SQL: \n" + query);

    const result = await database.executar(query, [email, senha]);

    if(result.length === 0) return false;

    if (result.length === 1) {
        const token = gerarToken()

        usuariosLogados.push({
            token: token,
            id: result[0].idUsuario,
            nome: result[0].nome,
            email: result[0].email,
            identidade: result[0].identidade,
            idade: result[0].idade,
            senha: result[0].senha,
            cargo: result[0].cargo
        });

        return token;
    }

    return false;
}

// Coloque os mesmos parâmetros aqui. Vá para a var query
function cadastrar(nome, email, identidade, dtNascimento, senha) {

    let query = `
        INSERT INTO usuario (nome, email, identidade, dtNascimento, senha, cargo) VALUES (?, ?, ?, ?, ?, 'p');
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [nome, email, identidade, dtNascimento, senha]);
}

function contarGenero() {
    let query = `select count(identidade) from usuario group by identidade`;
    return database.executar(query);
}

function contarIdade() {
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
    contarIdade,
    usuariosLogados
};