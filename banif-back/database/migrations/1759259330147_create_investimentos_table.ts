import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'investimentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('investimento_id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('investimento_tipo')
      table.string('investimento_valor_investido')
      table.date('investimento_data')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}