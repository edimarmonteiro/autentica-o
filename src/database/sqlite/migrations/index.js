const sqlitePonnection = require('../../sqlite/index');
const createUsers = require('../migrations/createUsers');

async function MigrationRun() {
    //"Armazenando o tabelas"
    const schemas = [
        createUsers
    ].join('')//Juntar tudo do createUsers

    //Adicionando tabela altromaticamente
    sqlitePonnection()
    .then(db => db.exec(schemas))
    .catch(erro => console.log(erro));
}

module.exports = MigrationRun;