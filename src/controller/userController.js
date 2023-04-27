const { response } = require('express');
const sqliteConection = require('../database/sqlite/indes')

class userController {
    async create(request, response) {
        const{ name, email, passwor } = request.body;
    
        //Puxando eu bd (conecção)
        const database = await sqliteConection();

        //Enprementado valores ao bd
        await database.run(`INSERT INTO users (name, email, passwor) VALUES (?, ?, ?)`
        [name, email, passwor])

        //Sem repetição
        const checEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

        if(checEmail) {
            console.log('email já existente')
            //Trocar pelo erro pradonizado
        };
        return response.status(201).json();
    };

}