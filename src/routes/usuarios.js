const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");
const array = require('../models/usuarioModel');

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", (req, res) => {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", (req, res) => {
    usuarioController.autenticar(req, res);
});

router.get('/genero', (req, res) => { // ? PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send('Você não tem token válido!');
    }

    if (user.cargo === 'a') {
        usuarioController.contarGenero(req, res);
    } else {
        return res.status(400).send('Você não possui permissões!')
    }
});

router.get('/idade', (req, res) => { // ? PRECISA DE TOKEN
    usuarioController.contarIdade(req, res);
});

router.get('/verificar', (req, res) => { // ? PRECISA DE TOKEN
    const token = req.headers['token'];
    const user = array.usuariosLogados.find(user => user.token === token);

    if (!token || !user) {
        return res.status(400).send(false);
    }

    res.status(200).send(user.cargo);
});

module.exports = router;