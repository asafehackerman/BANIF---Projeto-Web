import ContaCorrente from '#models/conta_corrente'
import Investimento from '#models/investimento'
import Usuario from '#models/usuario'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Transacao extends BaseModel {
  public static table = 'transacoes'

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @column({ isPrimary: true })
  declare transacao_id: number

  @column()
  declare investimento_id: number | null

  @column()
  declare usuario_id: number

  @column()
  declare conta_origem_id: number | null

  @column()
  declare conta_destino_id: number | null

  @column()
  declare tipo: string

  @column()
  declare valor: number  

  // Relações
  @belongsTo(() => Usuario, { foreignKey: 'usuario_id' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Investimento, { foreignKey: 'investimento_id' })
  declare investimento: BelongsTo<typeof Investimento>

  @belongsTo(() => ContaCorrente, { foreignKey: 'conta_origem_id' })
  declare contaOrigem: BelongsTo<typeof ContaCorrente>

  @belongsTo(() => ContaCorrente, { foreignKey: 'conta_destino_id' })
  declare contaDestino: BelongsTo<typeof ContaCorrente>
}
