import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('people', function (table) {
    table.string('principal_uri');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('people', function (table) {
    table.dropColumn('principal_uri');
  });
}
