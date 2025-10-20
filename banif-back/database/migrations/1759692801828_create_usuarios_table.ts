import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').nullable()
      table.increments('id')

      table.string('username').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('cpf', 14).notNullable().unique()
      table.string('endereco').notNullable()
      table.boolean('is_gerente').notNullable().defaultTo(false) // default opcional
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

/* 
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM transacoes;
DELETE FROM investimentos;
DELETE FROM contas_correntes;
DELETE FROM usuarios;
SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE usuarios AUTO_INCREMENT = 1;
ALTER TABLE contas_correntes AUTO_INCREMENT = 1;
ALTER TABLE investimentos AUTO_INCREMENT = 1;
ALTER TABLE transacoes AUTO_INCREMENT = 1;

node ace db:seed --files database/seeders/usuario_seeder.ts
node ace db:seed --files database/seeders/conta_corrente_seeder.ts
*/