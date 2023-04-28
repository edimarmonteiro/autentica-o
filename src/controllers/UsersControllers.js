const AppError = require("../util/AppErro");
//Esportando bd
const sqlitePonnection = require('../database/sqlite');
//Esportando a CRIPTOGRAFIA
//const { hash, compare } = require("bcryptjs");

class UsersControllers {
async create(request, response) {
    const {name, email, password} = request.body;
    
    const database = await  sqlitePonnection();
    //Checando se o email já existe
    const checkuserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    //fazendo a verificação
    if(checkuserExists){
        throw new AppError('Esse email já está em usó');
    }
    return response.status(201).json();
   
}

}
module.exports = UsersControllers