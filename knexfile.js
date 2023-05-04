const path = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },

    pool: {
      afterCreate: (conn, cd) => conn.run("PRAGM foreign_keys = ON", cd)
    },

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migration')
    },

    useNullAsDefalt: true

  },

  
};
