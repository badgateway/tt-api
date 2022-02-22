import { Client } from '../../types';

export function collection(clients: Client[]) {

  return {
    _links: {
      self: {
        href: '/client',
        title: 'Clients',
      },
      item: clients.map(client => ({
        href: client.href,
        title: client.name
      })),

    },

    total: clients.length,

    _embedded: {
      item: clients.map( client => item(client) )
    }

  };

}

export function item(client: Client) {

  return {
    _links: {
      self: {
        href: client.href,
      },
      collection: {
        title: 'List of clients',
        href: '/client'
      },
      'entry-collection': {
        title: 'List of time entries',
        href: client.href + '/entry'
      }
    },
    name: client.name,
    createdAt: client.createdAt.toISOString(),
    modifiedAt: client.modifiedAt.toISOString(),
  };

}
