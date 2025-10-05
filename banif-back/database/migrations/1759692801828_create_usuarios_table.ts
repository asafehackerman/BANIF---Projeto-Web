import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').nullable()

      table.string('username').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('cpf', 14).notNullable().unique()
      table.string('endereco').notNullable()
      table.boolean('tipo').notNullable().defaultTo(false) // default opcional
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}