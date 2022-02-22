import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import { BadRequest } from '@curveball/http-errors';

import * as projectService from '../service';
import * as clientService from '../../client/service';
import * as hal from '../formats/hal';

import { ProjectNew as ProjectNewSchema } from '@badgateway/tt-types';

class ProjectCollection extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      await projectService.findAll()
    );

  }
  async post(ctx: Context) {

    ctx.request.validate<ProjectNewSchema>('https://tt.badgateway.net/schema/project-new.json');

    const body = ctx.request.body;

    const clientUrl = ctx.request.links.get('client');

    if (!clientUrl) {
      throw new BadRequest('A link with rel "client" must be provided');
    }

    const clientId = (clientUrl.href.split('/').pop());
    if (!clientId) {
      throw new BadRequest('The client link must be in the format /clients/123');
    }

    const client = await clientService.findById(+clientId);
    const project = await projectService.create({
      name: body.name,
      client,
    });

    ctx.status = 201;
    ctx.response.headers.set('Location', project.href);
  }

}

export default new ProjectCollection();
