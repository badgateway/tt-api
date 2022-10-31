import { PersonProjectForm } from '@badgateway/tt-types';
import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import { addUserPrivilege } from '../../a12n';

import * as projectService from '../service';



class ProjectPersonCollection extends Controller {

  async post(ctx: Context) {

    ctx.request.validate<PersonProjectForm>('https://tt.badgateway.net/schema/person-project-form.json');

    const params = {
      role: ctx.request.body.role,
      name: ctx.request.body.name,
      href: ctx.request.body.href
    };

    const person = await projectService.addPersonToProject(params);
    const projectId = +ctx.params.projectId;
    const project = await projectService.findById(projectId);

    await addUserPrivilege(
      person.principalUri,
      params.role,
      new URL(project.href, ctx.request.origin),
    );

    ctx.status = 201;

  }

}

export default new ProjectPersonCollection();
