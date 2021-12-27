import router from '@curveball/router';
import home from './home/controller';

import clientCollection from './client/controller/collection';
import client from './client/controller/item';

export default [
  router('/', home),

  router('/client', clientCollection),
  router('/client/:clientId', client),
];
