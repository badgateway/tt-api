import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import { Client as ClientSchema } from '@badgateway/tt-types';

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

  async put(ctx: Context) {

    ctx.request.validate<ClientSchema>('https://tt.badgateway.net/schema/client.json');

    const client = await clientService.findById(
      +ctx.params.clientId
    );

    client.name = ctx.request.body.name;
    await clientService.update(client);

    ctx.status = 204;

  }

}

export default new ClientItem();
