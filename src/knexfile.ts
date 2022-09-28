import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

// If this file is loaded by the 'knex' CLI utility, it's missing a bunch of
// things.
if (process.env.CURVEBALL_ORIGIN === undefined) {
  dotenv.config({path: __dirname + '/../.env'});
}

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST,
    port: +(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

module.exports = {
  development: config
};
