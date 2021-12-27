import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import * as hal from './formats/hal';

class HomeController extends Controller {

  get(ctx: Context) {

    ctx.response.type = 'application/json';
    ctx.response.body = hal.home();

  }

}

export default new HomeController();
