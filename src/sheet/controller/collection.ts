import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as personService from '../../person/service';
import * as hal from '../formats/hal';

class SheetCollection extends Controller {

  async get(ctx: Context) {

    const person = await personService.findById(
      +ctx.params.personId,
    );
    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(person);

  }
}

export default new SheetCollection();
