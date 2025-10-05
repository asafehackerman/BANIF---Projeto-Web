import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('transacao_id')
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').nullable()

      table.string('transacao_tipo').notNullable()
      table.decimal('transacao_valor', 12, 2).notNullable()
      
      table
        .integer('investimento_id')
        .unsigned()
        .nullable()
        .references('investimentos_id')
        .inTable('investimentos')
        .onDelete('CASCADE')

      table
        .integer('usuario_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')

      table
        .integer('conta_origem_id')
        .unsigned()
        .nullable()
        .references('contas_correntes_id')
        .inTable('contas_correntes')
        .onDelete('CASCADE')

      table
        .integer('conta_destino_id')
        .unsigned()
        .nullable()
        .references('contas_correntes_id')
        .inTable('contas_correntes')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
