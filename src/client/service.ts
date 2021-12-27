import { Client } from '../types';
import { NotFound } from '@curveball/http-errors';

export function findAll(): Client[] {

  return [
    {
      id: 1,
      name: 'Bad Gateway Inc.',
    },
    {
      id: 2,
      name: 'Black Horse Coffee',
    }
  ];

}

export function findById(id: number): Client {

  const client = findAll().find(client => client.id === id);

  if (!client) {
    throw new NotFound(`Client with id "${id}" not found`);
  }

  return client;

}
