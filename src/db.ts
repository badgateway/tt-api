import './types/pg';
import knex from 'knex';
import * as knexFile from './knexfile';

const db = knex((knexFile as any)['development']);

export default db;
