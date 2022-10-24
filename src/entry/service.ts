import { Client, Project, Person, Entry, NewEntry } from '../types';
import { NotFound } from '@curveball/http-errors';
import knex from '../db';
import * as projectService from '../project/service';
import * as personService from '../person/service';
import { DateTime } from 'luxon';
import { EntriesRecord } from 'knex/types/tables';

export async function findAll(): Promise<Entry[]> {

  return Promise.all(
    (await knex.select().from('entries'))
      .map( async (record) => {
        return mapRecord(
          record,
          await projectService.findById(record.project_id),
          await personService.findById(record.person_id)
        );
      })
  );
}

export async function findByPerson(person: Person): Promise<Entry[]> {

  return Promise.all(
    (await knex
      .select()
      .from('entries')
      .where('person_id', person.id)
    )
      .map( async (record) => {
        return mapRecord(
          record,
          await projectService.findById(record.project_id),
          person,
        );
      })
  );

}

export async function findByPersonAndWeek(person: Person, year: number, weekNum: number): Promise<Entry[]> {

  const start = DateTime.fromObject({
    weekYear: year,
    weekNumber: weekNum,
  }).startOf('week');

  const end = start.plus({days: 6});

  return Promise.all(
    (await knex
      .select()
      .from('entries')
      .where('person_id', person.id)
      .whereBetween('date', [start.toISODate(), end.toISODate()])
    )
      .map( async (record) => {
        return mapRecord(
          record,
          await projectService.findById(record.project_id),
          person,
        );
      })
  );

}

export async function findByProject(project: Project): Promise<Entry[]> {

  return Promise.all(
    (await knex
      .select()
      .from('entries')
      .where('project_id', project.id)
    )
      .map( async (record) => {
        return mapRecord(
          record,
          project,
          await personService.findById(record.person_id),
        );
      })
  );

}
export async function findByClient(client: Client): Promise<Entry[]> {

  return Promise.all(
    (await knex
      .select()
      .from('entries')
      .leftJoin('projects', 'entries.project_id', 'projects.id')
      .where('projects.client_id', client.id)
    )
      .map( async (record) => {
        return mapRecord(
          record,
          await projectService.findById(record.project_id),
          await personService.findById(record.person_id)
        );
      })
  );

}

export async function findById(person: Person, id: number): Promise<Entry> {

  const records = await knex.select()
    .from('entries')
    .where({
      id,
      person_id: person.id,
    });

  if (records.length === 0) {
    throw new NotFound(`Could not find entry with id ${id}`);
  }

  return mapRecord(
    records[0],
    await projectService.findById(records[0].project_id),
    person,
  );

}

export async function create(entry: NewEntry): Promise<Entry> {

  const result = await knex('entries').insert({
    project_id: entry.project.id,
    person_id: entry.person.id,
    date: entry.date,
    minutes: entry.minutes,
    description: entry.description,
    billable: entry.billable,
    created_at: new Date(),
    modified_at: new Date()
  });

  return {
    ...entry,
    id: result[0],
    href: `/person/${entry.person.id}/entry/${result[0]}`,
    createdAt: new Date(),
    modifiedAt: new Date()
  };

}

export async function update(entry: Entry): Promise<void> {

  await knex('entries').update({
    project_id: entry.project.id,
    date: entry.date,
    minutes: entry.minutes,
    description: entry.description,
    billable: entry.billable,
    modified_at: new Date()
  }).where({id: entry.id});

}

export async function deleteEntry(entry: Entry): Promise<void>{
  await knex('entries')
    .where({project_id: entry.project.id})
    .where({id: entry.id})
    .del();
}

function mapRecord(input: EntriesRecord, project: Project, person: Person): Entry {

  return {
    id: input.id,
    href: `/person/${person.id}/entry/${input.id}`,
    project,
    person,
    date: DateTime.fromJSDate(input.date).toISODate(),
    minutes: input.minutes,
    description: input.description,
    billable: !!input.billable,
    createdAt: input.created_at,
    modifiedAt: input.modified_at
  };

}
