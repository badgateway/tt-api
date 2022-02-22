import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as hal from '../formats/hal';
import * as clientService from '../service';

import { ClientNew as ClientNewSchema } from '@evert/tt-types';

class ClientCollection extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      await clientService.findAll()
    );

  }
  async post(ctx: Context) {

    ctx.request.validate<ClientNewSchema>('https://tt.badgateway.net/schema/client-new.json');

    const body = ctx.request.body;
    const client = await clientService.create({
      name: body.name,
    });

    ctx.status = 201;
    ctx.response.headers.set('Location', client.href);

  }
}

export default new ClientCollection();
