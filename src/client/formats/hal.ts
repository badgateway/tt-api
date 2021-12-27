import { Client } from '../../types';

export function collection(clients: Client[]) {

  return {
    _links: {
      self: {
        href: '/client',
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

  }

}

export function item(client: Client) {

  return {
    _links: {
      self: {
        href: client.href,
      },
      collection: {
        title: 'List of clients',
        href: `/client`
      }
    },
    name: client.name,
    createdAt: client.createdAt.toISOString(),
    modifiedAt: client.modifiedAt.toISOString(),
  }

}
