import router from '@curveball/router';
import home from './home/controller';

import client from './client/controller/item';
import clientCollection from './client/controller/collection';
import person from './person/controller/item';
import personCollection from './person/controller/collection';
import project from './project/controller/item';
import projectCollection from './project/controller/collection';
import projectPersonCollection from './project/controller/person-collection';

import entryCollectionClient from './entry/controller/client-collection';
import entryCollectionProject from './entry/controller/project-collection';
import entryCollectionPerson from './entry/controller/person-collection';
import entry from './entry/controller/item';

import sheetCollection from './sheet/controller/collection';
import sheet from './sheet/controller/item';

export default [
  router('/', home),

  router('/client', clientCollection),
  router('/client/:clientId', client),
  router('/client/:clientId/entry', entryCollectionClient),

  router('/person', personCollection),
  router('/person/:personId', person),
  router('/person/:personId/entry', entryCollectionPerson),
  router('/person/:personId/entry/:entryId', entry),
  router('/person/:personId/sheet', sheetCollection),
  router('/person/:personId/sheet/:year/:weekNum', sheet),

  router('/project', projectCollection),
  router('/project/:projectId', project),
  router('/project/:projectId/entry', entryCollectionProject),
  router('/project/:projectId/person', projectPersonCollection)

];
