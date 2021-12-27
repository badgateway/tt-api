import * as fs from 'fs';
import * as path from 'path';

const pkg =
  JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../../../package.json'),
      'utf-8'
    )
  );

export function home() {

  return {
    name: pkg.name,
    version: pkg.version,

    _links: {
      'client-collection': {
        href: '/client',
        title: 'List of clients',
      }
    },
  };

}
