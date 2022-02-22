import { Entry, Person, Client, Project } from '../../types';

export function collection(owner: Person | Client | Project, entries: Entry[]) {

  return {
    _links: {
      self: {
        href: owner.href + '/entry',
      },
      item: entries.map(entry => ({
        href: entry.href,
      })),
      up: {
        href: owner.href,
        title: `Back to ${owner.name}`,
      }
    },

    total: entries.length,

    _embedded: {
      item: entries.map( entry => item(entry) )
    }

  };

}

export function item(entry: Entry) {

  return {
    _links: {
      self: {
        href: entry.href,
      },
      collection: {
        title: 'List of entries',
        href: `/person/${entry.person.id}/entry`
      },
      client: {
        title: entry.project.client.name,
        href: entry.project.client.href,
      },
      project: {
        title: entry.project.name,
        href: entry.project.href,
      },
      person: {
        title: entry.person.name,
        href: entry.person.href
      }
    },
    description: entry.description,
    date: entry.date,
    minutes: entry.minutes,
    billable: entry.billable,
    createdAt: entry.createdAt.toISOString(),
    modifiedAt: entry.modifiedAt.toISOString(),
  };

}
