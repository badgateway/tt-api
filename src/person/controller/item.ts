import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as hal from '../formats/hal';
import * as personService from '../service';

class PersonItem extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.item(
      await personService.findById(
        +ctx.params.personId, 
      )
    ); 

  }
}

export default new PersonItem();
