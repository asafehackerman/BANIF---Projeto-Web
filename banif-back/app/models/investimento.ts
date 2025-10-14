import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Investimento extends BaseModel {
  public static table = 'investimentos'

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @column({ isPrimary: true })
  declare investimentos_id: number

  @column()
  declare conta_corrente_id: number

  @column()
  declare tipo: string

  @column()
  declare valor_investido: number

  @column.date()
  declare data: DateTime
  
}
