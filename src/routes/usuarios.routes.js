const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario.model');

router.get('/', async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

router.post('/', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'El nombre de usuario es obligatorio' });

    const existe = await Usuario.findOne({ username });
    if (existe) return res.status(409).json({ error: 'El usuario ya existe' });

    const nuevoUsuario = new Usuario({ username });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
});

module.exports = router;

