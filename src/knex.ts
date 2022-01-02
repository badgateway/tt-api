import knexInit from 'knex';
const knexFile = require('./knexfile');

export interface DbClient {
  id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
}

export interface DbProject {
  id: number;
  name: string;
  client_id: number;
  created_at: Date;
  modified_at: Date;
}

export interface DbPerson {
  id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
}

export interface DbEntry {
  id: number;
  
  date: Date;
  minutes: number;

  description: string;

  person_id: number;
  project_id: number;

  billable: number;

  modified_at: Date,
  created_at: Date,

}

declare module 'knex/types/tables' {

  interface Tables {

    clients: DbClient;
    projects: DbProject;
    person: DbPerson; 

  }

}
export const knex = knexInit(knexFile.development);
export default knex;
