import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import * as personService from '../../person/service';
import * as entryService from '../../entry/service';

import * as hal from '../formats/hal';

class Sheet extends Controller {

  async get(ctx: Context) {

    const person = await personService.findById(
      +ctx.params.personId,
    );

    const year = +ctx.params.year;
    const weekNum = +ctx.params.weekNum;

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.item(
      person,
      year,
      weekNum,
      await entryService.findByPersonAndWeek(person, year, weekNum),
    );

  }

}

export default new Sheet();
