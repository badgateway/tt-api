import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('projects', function(table) {
      table.increments('id');
      table.integer('client_id').unsigned().notNullable();
      table.string('name', 255).notNullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('modified_at').notNullable();
      table.foreign('client_id').references('clients.id');
    });

}

export async function down(knex: Knex) {

  await knex.schema.dropTable('projects');

}
