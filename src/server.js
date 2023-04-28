require("express-async-errors");
const MigrationRun = require("./database/sqlite/migrations/index");
const AppError = require("./util/AppErro")

//const { response } = require('express');
const express = require('express');

const routes = require('./routes');
//execultando banco de dados
MigrationRun();

//Subindo o express
const app = express();
app.use(express.json());

//Pegando as rotas 
app.use(routes);

//Erro === Erro da request
app.use((error, request, response, next) => {
    //instanceof AppError = se a instacia dele for desse tipo
    
    //Verificando erro do lado do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "errado",
            message: error.message,
        });
    }

    //Erro do lado do servidor
    return response.status(500).json({
        status: "error",
        messa: "deu merda",
    })
})
//Escolhendo a porta do servidor
const Port = 2023;
app.listen(Port, () => console.log(`Servidor está on papai, na porta ${Port}`));