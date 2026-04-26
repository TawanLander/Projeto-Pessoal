function cadastrar() {
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
                sessionStorage.setItem('usuario', JSON.stringify ({
                    id: json.id,
                    email: json.email,
                    nome: json.nome,
                    idade: json.idade,
                    genero: json.genero,
                    senha: json.senha,
                    tipo: json.tipo
                }))
                setTimeout(function () {
                    window.location = "./index.html";
                }, 1000);
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