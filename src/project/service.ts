import { Client, Project, NewProject } from '../types';
import { PersonProjectForm } from '@badgateway/tt-types';
import { NotFound } from '@curveball/http-errors';
import knex from '../db';
import * as clientService from '../client/service';
import * as personService from '../person/service';
import { ProjectsRecord } from 'knex/types/tables';
import ketting from '../ketting';

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

function mapRecord(input: ProjectsRecord, client: Client): Project {

  return {
    id: input.id,
    href: `/project/${input.id}`,
    client,
    name: input.name,
    createdAt: input.created_at,
    modifiedAt: input.modified_at,
  };

}

export async function  addPersonToProject(params: PersonProjectForm): Promise<void> {

  const principalUri = await findOrCreatePrincipal(params.href, params.name);

  try {
    await personService.findByPrincipalUrl(principalUri);
  } catch(error) {

    if(!(error instanceof NotFound)){
      throw error;
    }


    // create a Person in knex
    await personService.create({
      name: params.name,
      principalUri,
    });
  }

}

export async function findOrCreatePrincipal(href: string, name: string): Promise<string> {
  const findUserRes = await ketting.follow('user-collection').follow('find-by-href', {href});

  let principalUri: string;
  try {
    // if a user exists
    const findUser = await findUserRes.get();
    principalUri = new URL(findUser.links.get('self')!.href, findUser.uri).toString();
  }
  catch(error: any){

    if(error.status != 404){
      throw error;
    }
    // if a user was not found

    const userCollectionRes = await ketting.follow('user-collection');
    const newUser = await userCollectionRes.postFollow({
      data: {
        nickname: name,
        active: false,
        type: 'user',
        _links: {
          me: {
            href: href,
          }
        }
      }
    });
    principalUri = newUser.uri;
  }
  return principalUri;
}
