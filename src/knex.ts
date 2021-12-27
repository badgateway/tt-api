import knexInit from 'knex';
const knexFile = require('../knexfile');

export interface DbClient {
  id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
}

declare module 'knex/types/tables' {

  interface Tables {

    clients: DbClient;

  }

}
export const knex = knexInit(knexFile.development);
export default knex;
