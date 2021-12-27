import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as hal from '../formats/hal';
import * as clientService from '../service';

class ClientCollection extends Controller {

  get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      clientService.findAll()
    ); 

  }
  post() { }
}

export default new ClientCollection();
