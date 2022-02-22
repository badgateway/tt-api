import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as entryService from '../service';
import * as projectService from '../../project/service';
import * as hal from '../formats/hal';

class EntryCollectionProject extends Controller {

  async get(ctx: Context) {

    const project = await projectService.findById(
      +ctx.params.projectId,
    );
    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      project,
      await entryService.findByProject(project)
    );

  }

}

export default new EntryCollectionProject();
