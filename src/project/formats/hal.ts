import { Project } from '../../types';

export function collection(projects: Project[]) {

  return {
    _links: {
      self: {
        href: '/project',
        title: 'Projects',
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

  };

}

export function item(project: Project) {

  return {
    _links: {
      self: {
        href: project.href,
      },
      collection: {
        title: 'List of projects',
        href: '/project',
      },
      client: {
        title: project.client.name,
        href: project.client.href,
      },
      'entry-collection': {
        title: 'List of time entries',
        href: project.href + '/entry',
      },
    },
    _templates: {
      add: {
        title: 'Add a Person to a Project',
        method: 'POST',
        contentType: 'application/json',
        target: `${project.href}/person`,
        properties: [
          {
            name: 'Role',
            prompt: 'Role',
            required: true,
            options: {
              inline: ['member', 'manager', 'owner'],
            },
          },
          {
            name: 'name',
            prompt: 'Name',
            required: true,
            placeHolder: 'John Doe',
          },
          {
            name: 'href',
            prompt: 'Href',
            required: true,
            type: 'url',
            placeHolder: 'mailto:johndoe@badgateway.net',
          },
        ],
      },
    },
    name: project.name,
    createdAt: project.createdAt.toISOString(),
    modifiedAt: project.modifiedAt.toISOString(),
  };

}
