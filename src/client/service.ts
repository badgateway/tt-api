import { Client, NewClient } from '../types';
import { NotFound } from '@curveball/http-errors';
import { Context } from '@curveball/core';
import knex from '../db';
import { ClientsRecord } from 'knex/types/tables';
import ketting from '../ketting';
import { LinkNotFound } from 'ketting';

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

export async function addUserPrivilege(ctx: Context, client: Client): Promise<void> {
  let userPrivilegesRes;

  try {

    userPrivilegesRes = await ketting.go(
      ctx.state.oauth2._links['authenticated-as'].href
    ).follow('privileges');

  } catch (err) {
    if (err instanceof LinkNotFound) {
      throw new Error('Link with "privileges" is not found on the user resource. This could mean that the tt-api APP in a12n-server does not have the *admin" privilege');
    }
    throw err;
  }

  const userPrivilegesState = await userPrivilegesRes.get();
  if (!userPrivilegesState.hasAction('add')) {
    throw new Error('The privileges resource on a12nserver does not have an \'add\' action. You likely need to update your a12n-server for this to work');
  }
  await userPrivilegesState.action('add').submit({
    action: 'add',
    privilege: 'owner',
    resource: new URL(client.href, ctx.request.origin).toString()
  });
}
