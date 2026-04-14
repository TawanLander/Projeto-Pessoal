const email = document.getElementById('ipt-email');
const senha = document.getElementById('ipt-senha');
const nome = document.getElementById('ipt-nome');
const genero = document.getElementById('slc-genero');
const idade = document.getElementById('ipt-idade');
const senhaConfirmar = document.getElementById('ipt-senhaConfirmar');
const confirmacao = document.getElementById('confirmacao');
const casoOutro = document.getElementById('casoOutro');

const erroEmail = document.getElementById('erro-email');
const erroSenha = document.getElementById('erro-senha');
const erroIdade = document.getElementById('erro-idade');
const erroSenhaConfirmar = document.getElementById('erro-senhaConfirmar');

var generoAlternativo = false;
const outroGenero = document.getElementById('ipt-outroGenero');

function verificarNome(){
    let nomeValor = nome.value;
}

function verificarEmail() {
    let emailValor = email.value;

    let indexEspecial = emailValor.indexOf('@');
    let indexPonto = emailValor.indexOf('.com');

    if (emailValor.length != 0) {
        if (emailValor.length >= 10 && indexEspecial >= 0 && indexPonto >= 0 && indexEspecial < indexPonto && !emailValor.includes(' ')) {
            addClass(email, 'valido');
            removeClass(email, 'invalido');
            addClass(erroEmail, 'sumir');
        } else {
            addClass(email, 'invalido')
            removeClass(email, 'valido')
            if (emailValor.length >= 10) {
                removeClass(erroEmail, 'sumir')
            }
        }
    }
}

function verificarSenha(tipo) {
    let senhaValor = senha.value;
    if (tipo != 1) {
        if (senhaValor.length > 0) {
            if (senhaValor.length < 10) {
                addErro(erroSenha, `Senha menor que 10 dígitos!`)
                addClass(senha, 'invalido');
                removeClass(senha, 'valido');
            } else if (senhaValor.toLowerCase() === senhaValor || senhaValor.toUpperCase() === senhaValor) {
                addErro(erroSenha, `Senha precisa contar ao menos uma letra maiúscula ou minúscula!`);
                addClass(senha, 'invalido');
                removeClass(senha, 'valido');
            } else if (!/[!@#$%&*.]/.test(senhaValor)) {
                addErro(erroSenha, `Senha precisa conter algarismos especiais!`);
                addClass(senha, 'invalido');
                removeClass(senha, 'valido');
            } else if (senhaValor.includes(' ')) {
                addErro(erroSenha, `Senha não pode conter espaço!`);
                addClass(senha, 'invalido');
                removeClass(senha, 'valido');
            } else if (!/[123456789]/.test(senhaValor)) {
                addErro(erroSenha, 'Senha precisa conter algum número')
                addClass(senha, 'invalido');
                removeClass(senha, 'valido');
            } else {
                addClass(erroSenha, 'sumir')
                removeClass(senha, 'invalido')
                addClass(senha, 'valido')
            }
        }
    } else {
        let senhaConfirmarValor = senhaConfirmar.value;
        if (senhaConfirmarValor != senhaValor && senhaConfirmarValor.length >= senhaValor.length) {
            addClass(senhaConfirmar, 'invalido');
            removeClass(senhaConfirmar, 'valido');
            removeClass(erroSenhaConfirmar, 'sumir');
        } else if (senhaConfirmarValor.length >= senhaValor.length) {
            addClass(senhaConfirmar, 'valido');
            removeClass(senhaConfirmar, 'invalido');
            addClass(erroSenhaConfirmar, 'sumir')
        } else {
            removeClass(senhaConfirmar, 'invalido', 'valido');
            addClass(erroSenhaConfirmar, 'sumir')
        }
    }
}
function ativarGenero() {
    let generoValor = genero.value;

    if (generoValor === 'Outro') {
        removeClass(casoOutro, 'sumir');
    } else {
        addClass(casoOutro, 'sumir');
        generoAlternativo = false;
    }
}

function verificarGenero() {
    let outroGeneroValor = outroGenero.value;

    generoAlternativo = true;
    if (outroGeneroValor.length <= 2) {
        addClass(outroGenero, 'invalido')
        removeClass(outroGenero, 'valido')
    } else {
        addClass(outroGenero, 'valido')
        removeClass(outroGenero, 'invalido')
    }
}

function verificarData() {
    const data = new Date();
    const dataPassada = new Date(1920, 0, 1);

    let dataPassadaFormatada = `${dataPassada.getFullYear()}-${String(dataPassada.getMonth() + 1).padStart(2, '0')}-${dataPassada.getDate()}`;

    let dataFormatada = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${data.getDate()}`;

    let idadeValor = idade.value;

    if (idadeValor < dataPassadaFormatada && idadeValor.length === 10) {
        addClass(idade, 'invalido');
        removeClass(idade, 'valido');
        addErro(erroIdade, 'A ano inserido não pode ser anterior a 1920!');
    } else if (idadeValor >= dataFormatada || idadeValor.length > 10) {
        addClass(idade, 'invalido');
        removeClass(idade, 'valido');
        addErro(erroIdade, 'A idade não pode ser maior ou igual a data atual!');
    } else {
        addClass(idade, 'valido');
        removeClass(idade, 'invalido');
        addClass(erroIdade, 'sumir')
    }
}

function limparClass() { // FUNÇÃO QUE LIMPA A CLASSE DE INVÁLIDO OU VÁLIDO APÓS SAIR DO INPUT
    // REMOVENDO CLASSES DO EMAIL
    if (erroEmail.classList.contains('sumir')) {
        removeClass(email, 'valido', 'invalido');
    }
    // REMOVENDO CLASSES DA SENHA
    if (erroSenha.classList.contains('sumir')) {
        removeClass(senha, 'invalido', 'valido');
    }
    // REMOVENDO AS CLASSES DA CONFIRMAÇÃO DE SENHA
    if (erroSenhaConfirmar.classList.contains('sumir')) {
        removeClass(senhaConfirmar, 'invalido', 'valido');
    }
    // REMOVENDO AS CLASSES DA DATA
    if (erroIdade.classList.contains('sumir')) {
        removeClass(erroIdade, 'invalido', 'valido');
    }
    // REMOVENDO AS CLASSES DA INPUT DE OUTRO GENERO (VALOR BOOLEANO) TRUE = TEM GENERO DIVERSO
    if (generoAlternativo) {
        removeClass(outroGenero, 'invalido', 'valido');
    }
}

function removeClass(i, ...c) { // FUNÇÃO QUE REMOVE AS CLASSES DO DO ELEMENTO PASSADO
    i.classList.remove(...c)
}

function addClass(i, ...c) { // FUNÇÃO QUE ADICIONAS CLASSES NO ELEMENTO PASSADO
    i.classList.add(...c)
}

function addErro(e, msg) {
    e.innerHTML = msg;
    removeClass(e, 'sumir');
}

function cadastrar() {
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome.value,
            emailServer: email.value,
            generoServer: genero.value,
            dtNascimentoServer: idade.value,
            senhaServer: senha.value
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                setTimeout(() => {
                    window.location = "./login.html";
                }, "2000");
                removeClass(confirmacao, 'sumir')
                addClass(confirmacao, 'animacao')
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}

function login() {
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email.value,
            senhaServer: senha.value
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO login()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.DTNASCIMENTO_USUARIO = json.dtNascimento;
                sessionStorage.GENERO_USUARIO = json.genero;
                sessionStorage.SENHA_USUARIO = json.senha;
                sessionStorage.TIPO_USUARIO = json.tipo;
                setTimeout(function () {
                    window.location = "./index.html";
                }, 1000); // apenas para exibir o loading
            });
        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}