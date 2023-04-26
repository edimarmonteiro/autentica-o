const express = require('express');
const database = require('./database/sqlite/indes')

const port = 1111

const app = express();

//subindo banco de dados
database();

app.listen(port, () => {
    console.log('Servidor rodando com sucesso')
})