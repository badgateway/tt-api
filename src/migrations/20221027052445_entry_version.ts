import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {

  await knex.schema.alterTable('entries', table => {

    table.integer('version').unsigned().notNullable().defaultTo(1);

  });

}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.alterTable('entries', table => {

    table.dropColumn('version');

  });

}

