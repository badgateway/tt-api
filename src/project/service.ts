import { Client, Project, NewProject } from '../types';
import { NotFound } from '@curveball/http-errors';
import { knex, DbProject } from '../knex';
import * as clientService from '../client/service';

export async function findAll(): Promise<Project[]> {

  return Promise.all(
    (await knex.select().from('projects'))
      .map( async (record) => {
        return mapRecord(
          record,
          await clientService.findById(record.client_id)
        );
      })
  );
}

export async function findById(id: number): Promise<Project> {

  const records = await knex.select()
    .from('projects')
    .where('id', id);

  if (records.length === 0) {
    throw new NotFound(`Could not find project with id ${id}`);
  }

  return mapRecord(
    records[0],
    await clientService.findById(records[0].client_id)
  );

}

export async function create(project: NewProject): Promise<Project> {

  const result = await knex('projects').insert({
    name: project.name,
    client_id: project.client.id,
    created_at: new Date(),
    modified_at: new Date()
  });

  return {
    ...project,
    id: result[0],
    href: `/project/${result[0]}`,
    createdAt: new Date(),
    modifiedAt: new Date()
  };

}

export async function update(project: Project): Promise<void> {

  await knex('projects').update({
    name: project.name,
    client_id: project.client.id,
    modified_at: new Date()
  }).where({id: project.id});

}

function mapRecord(input: DbProject, client: Client): Project {

  return {
    id: input.id,
    href: `/project/${input.id}`,
    client,
    name: input.name,
    createdAt: input.created_at,
    modifiedAt: input.modified_at
  };

}
