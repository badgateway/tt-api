// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'tt',
      password: 'password',
      database: 'tt',
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
