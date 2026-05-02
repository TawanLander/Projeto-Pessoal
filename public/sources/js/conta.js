const BDnome = document.getElementById('bd-nome');
const BDgenero = document.getElementById('bd-genero');
const BDquizes = document.getElementById('bd-quizes');
const BDsenha = document.getElementById('bd-senha');
const BDidade = document.getElementById('bd-idade');
const BDemail = document.getElementById('bd-email');

function plotarDadosUsuario() {
    BDnome.textContent = sessao.nome;
    BDgenero.textContent = sessao.identidade;
    BDidade.textContent = sessao.idade;
    BDemail.textContent = sessao.email;
    BDsenha.textContent = sessao.senha
}

function ocultarSenha() {

}