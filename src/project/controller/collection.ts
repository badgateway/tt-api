import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as projectService from '../service';
import * as clientService from '../../client/service';
import * as hal from '../formats/hal';

class ProjectCollection extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      await projectService.findAll()
    ); 

  }
  async post(ctx: Context) {

    const body = ctx.request.body as any;

    const client = await clientService.findById(body.clientId);
    const project = await projectService.create({
      name: body.name,
      client,
    });

    ctx.status = 201;
    ctx.response.headers.set('Location', project.href);
    

  }

}

export default new ProjectCollection();
