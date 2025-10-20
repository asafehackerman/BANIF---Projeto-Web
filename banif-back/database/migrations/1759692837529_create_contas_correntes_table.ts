import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contas_correntes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').nullable()
      table.increments('conta_corrente_id')
      table.integer('usuario_id').unsigned().notNullable().references('id').inTable('usuarios').onDelete('CASCADE')


      table.string('numero_conta').unique().notNullable()
      table.string('agencia').notNullable()
      table.decimal('saldo', 12, 2).notNullable().defaultTo(0)
      table.decimal('limite', 12, 2).notNullable().defaultTo(0)

      
    })
  }

  async down() {
    this.schema.dropTableIfExists(this.tableName)
  }
}

  /*
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⠉⠛⠛⠛⠿⢿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠹⣿⣿⣿
    ⣿⣿⣿⣿⣿⠻⠟⣻⣿⣟⠛⣿⣿⣿⠋⠄⠄⢀⣤⣤⣴⣶⣶⣤⣀⠄⠄⠘⢻⣿
    ⣿⣿⣿⣿⣧⢀⣀⣻⣿⣿⣦⣿⣿⣯⠄⠄⠄⢾⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⠄⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⢻⣿⣿⣿⣿⡓⠄⠄⠄⣝⣭⠉⠩⣽⡍⠉⢐⣿⡆⠄⠄⣸
    ⣿⣿⣿⣿⣿⣿⣿⣆⣄⣶⣿⣿⣿⣧⣄⠄⢸⣿⣾⣾⣾⣿⣷⣾⣿⣿⡇⠄⣰⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄⢿⣿⡿⠷⠂⠒⢿⣿⣿⠃⢀⣿⣿
    ⣿⠉⢹⣿⡏⠉⡏⠉⣿⡏⠉⣿⣿⣿⠉⠉⠃⠄⠙⠁⢠⠄⠠⠄⠈⠁⠄⢸⣿⣿
    ⣿⠄⢸⣿⡇⠄⡇⠄⣿⡇⠄⣿⣿⡏⠄⠄⠰⠄⠄⠄⠄⠄⠄⠄⠄⠄⢠⣼⣿⣿
    ⣿⠄⠸⠿⡇⠄⠇⠄⣾⡇⠄⠿⢿⠇⠄⡀⠄⣇⡀⠄⠄⠄⠄⠄⠄⠄⣼⣿⣿⣿
    ⣿⠤⢤⣤⣷⣦⣤⠶⢿⡧⠤⡤⠼⢤⣼⣿⠶⠾⠿⣦⣤⣤⣤⣦⣤⣴⣿⣿⣿⣿
    ⣿⠄⢸⣿⡏⠄⢹⠄⢸⠇⢠⡇⠄⡀⠈⢻⠄⢀⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⠄⢸⣿⡇⠄⢸⡇⠈⠄⢸⡇⠄⠁⢀⣾⠄⢀⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣀⣈⣁⣇⣀⣼⣿⣀⣀⣿⣇⣀⣇⣀⣹⣀⣀⣉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  */