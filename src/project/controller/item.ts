import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as projectService from '../service';
import * as hal from '../formats/hal';

class Project extends Controller {

  async get(ctx: Context) {
    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.item(
      await projectService.findById(
        +ctx.params.projectId,
      )
    );
  }
}

export default new Project();
