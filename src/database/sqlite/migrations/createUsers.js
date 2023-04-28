//Criando a tabela com SQL puro

const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        email VARCHAR,
        password VARCHAR,
        avatar VARCHAR NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

module.exports = createUsers






















// exports.up = knex => knex.schema.createTable('users', table => {
//     table.increments('id');
//     table.text('name');
//     table.text('email');
//     table.text('password');

//     table.timestamp('created_at').default(knex.fn.now());
//     table.timestamp('updated_at').default(knex.fn.now());
// });

// exports.down = knex => knex.schema.dropTable('users');


