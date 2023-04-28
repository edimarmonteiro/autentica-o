const { Router } = require('express');

const UsersControllers = require('../controllers/UsersControllers');
const userRoutes = Router();

const usersControllers = new UsersControllers();

//Criando usuario
userRoutes.post("/", usersControllers.create);

//Esportando para quem quiser usar esse arquivo, poder ussar
module.exports = userRoutes;