const AppError = require("../util/AppErro");
//Esportando bd
const sqlitePonnection = require('../database/sqlite');
//Esportando a CRIPTOGRAFIA
const { hash, compare } = require("bcryptjs");

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

    //Gerando a CRIPTOGRAFIA
    const hashedPassword = await hash(password, 8);

    //Encerindo valor ao bd
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]);

    return response.status(201).json();
   
}

async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    //Conectando se ao bd
    const database = await sqlitePonnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user){
        throw new AppError("Usuario não encontrado")
    }

    const userwithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    //para não usar email já existente
    if(userwithUpdateEmail && userwithUpdateEmail.id !== user.id){
        throw new AppError("E-mail já existente");
    }

    //atualizando os dados 
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    //Se a senha antiga não for informada
    if(password && !old_password){
        throw new AppError("Você precisa informar a senha antiga");
    }

    if(password && old_password){
        //Comparando as senha. Antiga com a nova 
        const checkOldPasswoer = await compare(old_password, user.password);
    
        //Se a senha informada for errada
        if(!checkOldPasswoer){
            throw new AppError("Senha não confere com a atiga")
        }
        //permitindo a nova senha
        user.password = await hash(password, 8);
    }

    //Acresentando a atualização no bd
    await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, id]
        );

        return response.json();
}
}

module.exports = UsersControllers
