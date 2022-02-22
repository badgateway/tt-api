import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('entries', function(table) {
      table.increments('id');
      table.integer('person_id').unsigned().notNullable();
      table.integer('project_id').unsigned().notNullable();
      table.date('date').notNullable();
      table.integer('minutes').unsigned().notNullable();
      table.string('description').notNullable();
      table.boolean('billable').notNullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('modified_at').notNullable();
      table.foreign('person_id').references('people.id');
      table.foreign('project_id').references('projects.id');
    });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('entries');
}

