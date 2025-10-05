import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contas_correntes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('contas_correntes_id')
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').nullable()

      table.integer('contas_correntes_numero_conta').unique().notNullable()
      table.integer('contas_correntes_agencia').notNullable()
      table.decimal('contas_correntes_saldo', 12, 2).notNullable().defaultTo(0)
      table.decimal('contas_correntes_limite', 12, 2).notNullable().defaultTo(0)

      table
        .integer('usuario_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')
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