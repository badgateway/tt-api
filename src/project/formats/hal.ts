import { Project } from '../../types';

export function collection(projects: Project[]) {

  return {
    _links: {
      self: {
        href: '/project',
      },
      item: projects.map(project => ({
        href: project.href,
        title: project.name
      })),
      
    },

    total: projects.length,

    _embedded: {
      item: projects.map( project => item(project) )
    }

  }

}

export function item(project: Project) {

  return {
    _links: {
      self: {
        href: project.href,
      },
      collection: {
        title: 'List of projects',
        href: `/project`
      },
      client: {
        title: project.client.name,
        href: project.client.href,
      },
      'entry-collection': {
        title: 'List of time entries',
        href: project.href + '/entry'
      }
    },
    name: project.name,
    createdAt: project.createdAt.toISOString(),
    modifiedAt: project.modifiedAt.toISOString(),
  }

}
