import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as hal from '../formats/hal';
import * as clientService from '../service';
import ketting from '../../ketting';

import { ClientNew as ClientNewSchema } from '@badgateway/tt-types';
import { LinkNotFound } from 'ketting';

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

    let userPrivilegesRes;

    try {

      userPrivilegesRes = await ketting.go(
        ctx.state.oauth2._links['authenticated-as'].href
      ).follow('privileges');

    } catch (err) {
      if (err instanceof LinkNotFound) {
        throw new Error('Link with "privileges" is not found on the user resource. This could mean that the tt-api APP in a12n-server does not have the *admin" privilege');
      }
      throw err;
    }

    const userPrivilegesState = await userPrivilegesRes.get();
    if (!userPrivilegesState.hasAction('add')) {
      throw new Error('The privileges resource on a12nserver does not have an \'add\' action. You likely need to update your a12n-server for this to work');
    }
    await userPrivilegesState.action('add').submit({
      action: 'add',
      privilege: 'owner',
      resource: new URL(client.href, ctx.request.origin).toString()
    });

    ctx.status = 201;
    ctx.response.headers.set('Location', client.href);

  }
}

export default new ClientCollection();
