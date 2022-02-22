import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as entryService from '../service';
import * as clientService from '../../client/service';
import * as hal from '../formats/hal';

class EntryCollectionProject extends Controller {

  async get(ctx: Context) {

    const client = await clientService.findById(
      +ctx.params.clientId,
    );
    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      client,
      await entryService.findByClient(client)
    );

  }

}

export default new EntryCollectionProject();
