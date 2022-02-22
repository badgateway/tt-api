import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('people', function(table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('modified_at').notNullable();
    });

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('people');
}

