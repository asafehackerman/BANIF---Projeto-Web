import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Investimento extends BaseModel {
  public static table = 'investimentos'

  @column({ isPrimary: true })
  declare investimento_id: number

  @column()
  declare conta_corrente_id: number

  @column()
  declare tipo: string

  @column()
  declare valor_investido: number

  @column.date()
  declare data: DateTime

  @column()
  declare resgatado?: boolean

  @column()
  declare valor_resgatado?: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
