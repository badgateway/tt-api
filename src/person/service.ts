import { Person, NewPerson } from '../types';
import { NotFound } from '@curveball/http-errors';
import knex from '../db';
import { PeopleRecord } from 'knex/types/tables';

export async function findAll(): Promise<Person[]> {

  return (
    await knex.select().from('people')
  ).map( record => mapRecord(record) );

}

export async function findById(id: number): Promise<Person> {

  const records = await knex.select()
    .from('people')
    .where('id', id);

  if (records.length === 0) {
    throw new NotFound(`Could not find person with id ${id}`);
  }

  return mapRecord(records[0]);

}

export async function create(person: NewPerson): Promise<Person> {

  const result = await knex('people').insert({
    name: person.name,
    created_at: new Date(),
    modified_at: new Date(),
    principal_uri: person.principalUri,
  });

  return {
    ...person,
    id: result[0],
    href: `/person/${result[0]}`,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

}

export async function update(person: Person): Promise<void> {

  await knex('people').update({
    name: person.name,
    modified_at: new Date(),
  }).where({id : person.id});

}

function mapRecord(input: PeopleRecord): Person {

  return {
    id: input.id,
    href: `/person/${input.id}`,
    name: input.name,
    createdAt: input.created_at,
    modifiedAt: input.modified_at,
    principalUri: input.principal_uri,
  };

}

export async function findByPrincipalUrl(principalUrl: string): Promise<Person> {
  const records = await knex.select()
    .from('people')
    .where('principal_uri', principalUrl);

  if (records.length === 0) {
    throw new NotFound(`Could not find person: ${principalUrl}`);
  }

  return mapRecord(records[0]);
}
