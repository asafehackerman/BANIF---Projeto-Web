import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cliente_id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('cliente_username').unique()
      table.string('cliente_email').unique()
      table.string('cliente_password')
      table.string('cliente_cpf').unique
      table.string('cliente_endereco')
      table.integer('conta-corrente_id').unsigned().references('cc_id').inTable('contas-correntes')
      

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}