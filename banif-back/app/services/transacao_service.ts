import ContaCorrente from '#models/conta_corrente'
import Transacao from '#models/transacao'
import db from '@adonisjs/lucid/services/db'

export class TransacaoService {
  public static async fazerPix(contaOrigemId: number, contaDestinoId: number, valor: number) {
    const trx = await db.transaction()

    try {
      const contaOrigem = await ContaCorrente.findOrFail(contaOrigemId)
      const contaDestino = await ContaCorrente.findOrFail(contaDestinoId)

      const valorNum = Number(valor)

      if (Number(contaOrigem.saldo) < valorNum) {
        await trx.rollback()
        throw new Error('Saldo insuficiente na conta de origem')
      }

      // Atualiza saldos garantindo Number
      contaOrigem.saldo = Number(contaOrigem.saldo) - valorNum
      contaDestino.saldo = Number(contaDestino.saldo) + valorNum

      // Usa transação
      contaOrigem.useTransaction(trx)
      contaDestino.useTransaction(trx)

      await contaOrigem.save()
      await contaDestino.save()

      // Cria transações
      await Transacao.create({
        usuario_id: contaOrigem.conta_corrente_id,
        conta_origem_id: contaOrigemId,
        conta_destino_id: contaDestinoId,
        tipo: 'Pix - Envio',
        valor: -valorNum,
      }, { client: trx })

      await Transacao.create({
        usuario_id: contaDestino.conta_corrente_id,
        conta_origem_id: contaOrigemId,
        conta_destino_id: contaDestinoId,
        tipo: 'Pix - Recebido',
        valor: valorNum,
      }, { client: trx })

      await trx.commit()
      return { message: 'Pix realizado com sucesso!' }
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
