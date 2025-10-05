import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Investimento extends BaseModel {
  public static table = 'investimentos'
  
  @column({ isPrimary: true })
  declare investimentos_id: number

  @column()
  declare investimentos_tipo: string

  @column()
  declare investimentos_valor_investido: number

  @column.date()
  declare investimentos_data: DateTime

  @column()
  declare conta_corrente_id: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
