import { Client, NewClient } from '../types';
import { NotFound } from '@curveball/http-errors';
import knex from '../db';
import { ClientsRecord } from 'knex/types/tables';


export async function findAll(): Promise<Client[]> {

  return (
    await knex.select().from('clients')
  ).map( record => mapRecord(record) );

}

export async function findById(id: number): Promise<Client> {

  const records = await knex.select()
    .from('clients')
    .where('id', id);

  if (records.length === 0) {
    throw new NotFound(`Could not find client with id ${id}`);
  }

  return mapRecord(records[0]);

}

export async function create(client: NewClient): Promise<Client> {

  const result = await knex('clients').insert({
    name: client.name,
    created_at: new Date(),
    modified_at: new Date()
  });

  return {
    ...client,
    id: result[0],
    href: `/client/${result[0]}`,
    createdAt: new Date(),
    modifiedAt: new Date()
  };

}

export async function update(client: Client): Promise<void> {

  await knex('clients').update({
    name: client.name,
    modified_at: new Date(),
  }).where({id: client.id});

}

function mapRecord(input: ClientsRecord): Client {

  return {
    id: input.id,
    href: `/client/${input.id}`,
    name: input.name,
    createdAt: input.created_at,
    modifiedAt: input.modified_at
  };

}

