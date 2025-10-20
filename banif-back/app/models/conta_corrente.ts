  import Usuario from '#models/usuario'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

  export default class ContaCorrente extends BaseModel {
    public static table = 'contas_correntes'

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime
    
    @column({ isPrimary: true })
    declare conta_corrente_id: number

    @column()
    declare usuario_id: number

    @column()
    declare numero_conta: string

    @column()
    declare agencia: string

    @column()
    declare saldo: number

    @column()
    declare limite: number

    // Relação com usuário
    @belongsTo(() => Usuario, { foreignKey: 'usuario_id' })
    declare usuario: BelongsTo<typeof Usuario>
  }
