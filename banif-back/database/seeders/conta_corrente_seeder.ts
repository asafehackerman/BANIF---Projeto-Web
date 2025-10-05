import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ContaCorrente from '#models/conta_corrente'

export default class ContaCorrenteSeeder extends BaseSeeder {
  public async run() {
    await ContaCorrente.createMany([
      {
        contas_correntes_numero_conta: 12345,
        contas_correntes_agencia: 1,
        contas_correntes_saldo: 10000,
        contas_correntes_limite: 2000,
        usuario_id: 1,
      },
      {
        contas_correntes_numero_conta: 67890,
        contas_correntes_agencia: 2,
        contas_correntes_saldo: 5000,
        contas_correntes_limite: 1000,
        usuario_id: 2,
      },
      {
        contas_correntes_numero_conta: 11121,
        contas_correntes_agencia: 3,
        contas_correntes_saldo: 7500,
        contas_correntes_limite: 1500,
        usuario_id: 3,
      },
    ])
  }
}
