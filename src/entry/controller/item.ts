import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as entryService from '../service';
import * as hal from '../formats/hal';

class Entry extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.item(
      await entryService.findById(
        +ctx.params.entryId,
      )
    );
  }
}

export default new Entry();
