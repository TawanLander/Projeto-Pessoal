const BDnome = document.getElementById("bd-nome");
const BDgenero = document.getElementById("bd-genero");
const BDquizes = document.getElementById("bd-quizes");
const BDsenha = document.getElementById("bd-senha");
const BDidade = document.getElementById("bd-idade");
const BDemail = document.getElementById("bd-email");

async function plotarDadosUsuario() {
  const token = sessionStorage.getItem("token");

  const dados = await fetch("/usuarios/dados", {
    // ? PEGA OS DADOS DO BACKEND DO USUÁRIO LOGADO
    headers: {
      token: token,
    },
  });

  if (!dados.ok) return console.log("Erro no fetch dos dados!");

  const informacao = await dados.json(); // ? SE O FETCH DER CERTO, PEGA OS VALORES, TRANSFORMA EM JSON E APLICA NA PÁGINA

  BDnome.innerHTML = informacao.nome;
  BDgenero.innerHTML = informacao.identidade;
  BDquizes.innerHTML = informacao.quizes;
  BDsenha.innerHTML = informacao.senha;
  BDidade.innerHTML = informacao.idade;
  BDemail.innerHTML = informacao.email;
}

function ocultarSenha() {}
