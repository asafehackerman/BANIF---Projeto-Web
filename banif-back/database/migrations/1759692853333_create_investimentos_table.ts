import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'investimentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').nullable()
      table.increments('investimento_id')
      table.integer('conta_corrente_id').unsigned().notNullable().references('conta_corrente_id').inTable('contas_correntes').onDelete('CASCADE')
      
      
      table.string('tipo').notNullable()
      table.decimal('valor_investido', 12, 2).notNullable()
      table.date('data').notNullable()
      table.boolean('resgatado').defaultTo(false) // novo campo
      table.decimal('valor_resgatado', 12, 2).nullable() // novo campo
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