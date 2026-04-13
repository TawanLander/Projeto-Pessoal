const email = document.getElementById('ipt-email');
const senha = document.getElementById('ipt-senha');
const nome = document.getElementById('ipt-nome');
const genero = document.getElementById('slc-genero');
const idade = document.getElementById('ipt-idade');
const senhaConfirmar = document.getElementById('ipt-senhaConfirmar');
const confirmacao = document.getElementById('confirmacao');

const erroEmail = document.getElementById('erro-email');
const erroSenha = document.getElementById('erro-senha');
const erroSenhaConfirmar = document.getElementById('erro-senhaConfirmar');

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
        if (senhaConfirmar.value != senhaValor) {
            addClass(senhaConfirmar, 'invalido');
            removeClass(senhaConfirmar, 'valido');
            removeClass(erroSenhaConfirmar, 'sumir');
        } else {
            addClass(senhaConfirmar, 'valido');
            removeClass(senhaConfirmar, 'invalido');
            addClass(erroSenhaConfirmar, 'sumir')
        }
    }
}

function verificarGenero() {
    let generoValor = genero.value;
    let div = document.getElementById('casoOutro');
    if (generoValor === 'Outro') {
        removeClass(div, 'sumir');
    } else {
        addClass(div, 'sumir');
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