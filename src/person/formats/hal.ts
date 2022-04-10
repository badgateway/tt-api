import { Person } from '../../types';

export function collection(people: Person[]) {

  return {
    _links: {
      self: {
        href: '/person',
        title: 'People',
      },
      item: people.map(person => ({
        href: person.href,
        title: person.name
      })),

    },

    total: people.length,

    _embedded: {
      item: people.map( person => item(person) )
    }

  };

}

export function item(person: Person) {

  return {
    _links: {
      self: {
        href: person.href,
      },
      collection: {
        title: 'List of people',
        href: '/person'
      },
      'entry-collection': {
        title: 'List of time entries',
        href: person.href + '/entry'
      },
      'sheet-collection': {
        title: 'List of weekly time sheets',
        href: person.href + '/sheet',
      },
      'search-sheet': {
        title: 'Jump to a specific timesheet',
        href: `${person.href}/sheet/{year}/{weekNum}`,
        templated: true,
      }
    },
    name: person.name,
    createdAt: person.createdAt.toISOString(),
    modifiedAt: person.modifiedAt.toISOString(),
  };

}
