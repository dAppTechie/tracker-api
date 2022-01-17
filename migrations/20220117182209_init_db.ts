import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.specificType('id', 'CHAR(16)').primary();
    table.string('email').notNullable().unique();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
    table.string('department');
    table.boolean('isAdmin').defaultTo('false').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
