import { Client } from '../../types';

export function collection(clients: Client[]) {

  return {
    _links: {
      self: {
        href: '/client',
      },
      item: clients.map(client => ({
        href: `/client/${client.id}`,
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
        href: `/client/${client.id}`,
      },
      collection: {
        title: 'List of clients',
        href: `/client`
      }
    },
    name: client.name,
  }

}
