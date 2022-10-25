import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import { BadRequest } from '@curveball/http-errors';

import * as entryService from '../service';
import * as personService from '../../person/service';
import * as projectService from '../../project/service';
import * as hal from '../formats/hal';
import {DateTime} from 'luxon';
import { Entry as EntrySchema } from '@badgateway/tt-types';

class Entry extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';

    const person = await personService.findById(
      +ctx.params.personId,
    );

    ctx.response.body = hal.item(
      await entryService.findById(
        person,
        +ctx.params.entryId,
      )
    );
  }

  async put(ctx: Context) {

    ctx.request.validate<EntrySchema>('https://tt.badgateway.net/schema/entry.json');

    const person = await personService.findById(
      +ctx.params.personId,
    );

    const entry = await entryService.findById(
      person,
      +ctx.params.entryId,
    );

    const body = ctx.request.body;

    const projectUrl = ctx.request.links.get('project');

    if (!projectUrl) {
      throw new BadRequest('A link with rel "project" must be provided');
    }

    const projectId = (projectUrl.href.split('/').pop());
    if (!projectId) {
      throw new BadRequest('The project link must be in the format /projects/123');
    }

    const project = await projectService.findById(+projectId);

    entry.project = project;
    entry.description = body.description;
    entry.minutes = body.minutes;
    entry.date = body.date;
    entry.billable = body.billable;

    await entryService.update(entry);
    ctx.status = 204;

  }

  async delete(ctx: Context) {

    const person = await personService.findById(
      +ctx.params.personId,
    );

    const entryDate = DateTime.fromISO(entry.date);

    const entry = await entryService.findById(
      person,
      +ctx.params.entryId,
    );

    await entryService.deleteEntry(entry);

    ctx.response.status = 204;
    ctx.response.links.add({
      rel: 'invalidates',
      href: `/person/${person.id}/entry`
    });
    ctx.response.links.add({
      rel: 'invalidates',
      href: `/person/${person.id}/sheet/${entryDate.year}/${entryDate.weekNumber}`,
    });
  }

}

export default new Entry();
