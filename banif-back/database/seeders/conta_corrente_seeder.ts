import ContaCorrente from '#models/conta_corrente'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ContaCorrenteSeeder extends BaseSeeder {
  public async run() {
    await ContaCorrente.createMany([
      {
        conta_corrente_id: 1,
        numero_conta: "1.231-2",
        agencia: "12.312-3",
        saldo: 10000,
        limite: 2000,
        usuario_id: 1,
      },
      {
        numero_conta: "4.564-5",
        agencia: "45.645-6",
        saldo: 5000,
        limite: 1000,
        usuario_id: 2,
      },
      {
        numero_conta: "7.897-8",
        agencia: "78.978-9",
        saldo: 7500,
        limite: 1500,
        usuario_id: 3,
      },
      {
        numero_conta: "0.000-0",
        agencia: "00.000-0",
        saldo: 7500,
        limite: 1500,
        usuario_id: 4,
      },
    ])
  }
}
