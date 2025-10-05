import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'investimentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('investimentos_id')
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').nullable()
      
      table.string('investimentos_tipo').notNullable()
      table.decimal('investimentos_valor_investido', 12, 2).notNullable()
      table.date('investimentos_data').notNullable()

      table
        .integer('conta_corrente_id')
        .unsigned()
        .notNullable()
        .references('contas_correntes_id')
        .inTable('contas_correntes')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

  /*
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⡿⠟⠉⠁⠄⠄⠄⠄⠉⠉⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿
      ⣿⣿⣿⣿⣿⡿⠄⠄⣀⣤⣦⣶⣦⣦⣤⣤⣠⣀⠄⠹⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⠟⠁⠄⠘⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄⠹⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⡏⠄⢂⠄⠄⠸⠻⠿⠿⣿⣿⣿⣿⠿⠟⢿⡿⡀⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⡇⠄⠈⠄⠄⠄⠄⠄⠄⠄⢹⣇⣀⣄⣘⣹⣇⣇⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⡇⠄⠄⠄⠰⠄⣀⡀⣤⡀⢨⣿⣾⣧⣷⣿⣿⣬⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⠄⠄⠄⠄⠄⠘⣿⡟⠄⢀⣩⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⡇⠄⠄⠄⠄⠰⣏⠄⠈⢨⣍⣉⣛⣽⣿⣿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⣿⣶⡀⠄⠄⠄⠛⢀⢄⢰⣽⣿⣿⣿⣿⢟⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⣿⣿⣷⠄⠄⠄⠄⠄⠄⠈⢃⡙⢛⡻⣻⣿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⣿⣿⠏⠄⠄⠄⠄⠄⠄⠄⢠⣶⣶⣾⣿⡿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⠿⠛⠁⠄⠄⢺⣶⣦⡀⠄⠄⢰⣻⢿⣿⣿⡇⠈⠻⣿⣿⣿⣿ 
      ⠉⠁⠄⠄⠄⠄⠄⠄⠄⠻⣿⣿⡷⠆⠄⢓⢿⣿⣿⡇⠄⠄⠄⠄⠉⠙ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢻⠏⠄⠄⠐⠄⣄⠹⣿⡇⠄⠄⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢷⣤⡠⠄⢸⣿⣿⣮⠄⠄⠄⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⣯⠄⠄⠈⢿⣿⣿⠄⠄⠄⠄⠄⠄⠄
  */