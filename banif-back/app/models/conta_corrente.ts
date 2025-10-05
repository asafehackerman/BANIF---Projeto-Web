import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'

export default class ContaCorrente extends BaseModel {
  public static table = 'contas_correntes'
  
  @column({ isPrimary: true })
  declare contas_correntes_id: number

  @column()
  declare contas_correntes_numero_conta: number

  @column()
  declare contas_correntes_agencia: number

  @column()
  declare contas_correntes_saldo: number

  @column()
  declare contas_correntes_limite: number

  @column()
  declare usuario_id: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  // Relação com usuário
  @belongsTo(() => Usuario, { foreignKey: 'usuario_id' })
  declare usuario: BelongsTo<typeof Usuario>
}
