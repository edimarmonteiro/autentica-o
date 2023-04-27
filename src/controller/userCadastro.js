const express = require('express');

const express = express();

express.user(express.json());

express.post('/users', (req, res) => {
    const { name, email, password } = req.body;

    res.status(201).json({ message: 'Usuari cadastrado com sucesso!'})
})

