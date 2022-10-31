import { PersonProjectForm } from '@badgateway/tt-types';
import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as projectService from '../service';



class ProjectPersonCollection extends Controller {

  async post(ctx: Context) {

    ctx.request.validate<PersonProjectForm>('https://tt.badgateway.net/schema/person-project-form.json');

    const params = {
      role: ctx.request.body.role,
      name: ctx.request.body.name,
      href: ctx.request.body.href,
    };
    const projectId = +ctx.params.projectId;
    const origin = ctx.request.origin;

    await projectService.addPersonToProject(params, projectId, origin);

    ctx.status = 201;

  }

}

export default new ProjectPersonCollection();
