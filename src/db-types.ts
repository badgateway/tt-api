
declare module 'knex/types/tables' {

interface Tables {
  clients: ClientsRecord;
  entries: EntriesRecord;
  people: PeopleRecord;
  projects: ProjectsRecord;
}


/**
 * This file is auto-generated and should not be edited.
 * It will be overwritten the next time types are generated.
 */

export type ClientsRecord = {
  id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
}

export type EntriesRecord = {
  id: number;
  person_id: number;
  project_id: number;
  date: Date;
  minutes: number;
  description: string;
  billable: number;
  created_at: Date;
  modified_at: Date;
}

export type PeopleRecord = {
  id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
  principal_uri: string | null;
}

export type ProjectsRecord = {
  id: number;
  client_id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
}



}
