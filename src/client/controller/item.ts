import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as hal from '../formats/hal';
import * as clientService from '../service';

class ClientItem extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.item(
      await clientService.findById(
        +ctx.params.clientId, 
      )
    ); 

  }
}

export default new ClientItem();
