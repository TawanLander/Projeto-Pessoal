const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");
const array = require("../models/usuarioModel");

function verificarToken(req, res) {
  const token = req.headers["token"];
  const user = array.usuariosLogados.find((user) => user.token === token);

  if (!token || !user) {
    return res.status(400).send(false);
  }

  usuarioController.verificar(req, res, token);
}

router.post("/cadastrar", (req, res) => {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", (req, res) => {
  usuarioController.autenticar(req, res);
});

router.get("/informacoes", (req, res) => {
  // ? PRECISA DE TOKEN
  const token = req.headers["token"];
  const user = array.usuariosLogados.find((user) => user.token === token);

  if (!token || !user) {
    return res.status(400).send("Você não tem token válido!");
  }

  if (user.cargo === "a") {
    usuarioController.informacoes(req, res);
  } else {
    return res.status(400).send("Você não possui permissões!");
  }
});

router.get("/verificar", (req, res) => {
  // ? PRECISA DE TOKEN
  const token = req.headers["token"];
  const user = array.usuariosLogados.find((user) => user.token === token);

  if (!token || !user) {
    return res.status(400).send(false);
  }

  res.status(200).send(user.cargo);
});

router.get("/deslogar", (req, res) => {
  // ? PRECISA DE TOKEN
  const token = req.headers["token"];
  const user = array.usuariosLogados.find((user) => user.token === token);

  if (!token || !user) {
    return res.status(400).send(false);
  }

  let index = array.usuariosLogados.indexOf(user);
  array.usuariosLogados.splice(index);

  res.status(200).send('Usuário deslogado');
});

router.get('/excluir', (req, res) => {
  // ? PRECISA DE TOKEN
  const token = req.headers["token"];
  const user = array.usuariosLogados.find((user) => user.token === token);

  if (!token || !user) {
    return res.status(400).send(false);
  }

  const idUsuario = Number(user.id);

  usuarioController.excluir(req, res, idUsuario);
});

router.get("/dados", (req, res) => {
  // ? PRECISA DE TOKEN
  const token = req.headers["token"];
  const user = array.usuariosLogados.find((user) => user.token === token);

  if (!token || !user) {
    return res.status(400).send(false);
  }

  res.status(200).send({
    nome: user.nome,
    email: user.email,
    identidade: user.identidade,
    idade: user.idade,
    senha: user.senha,
    quizes: user.quizes
  }); // ? SE OCORRER TUDO, RETORNA O JSON USUÁRIO PARA O FRONT
});

module.exports = router;
