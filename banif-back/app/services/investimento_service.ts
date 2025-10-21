// app/services/investimento_service.ts
import ContaCorrente from '#models/conta_corrente'
import Investimento from '#models/investimento'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class InvestimentoService {
  // Cria um investimento e debita da conta corrente
  public static async aplicar(contaCorrenteId: number, tipo: string, valor: number) {
    return await db.transaction(async (trx) => {
      const conta = await ContaCorrente.findOrFail(contaCorrenteId)
      conta.useTransaction(trx)

      // Checa saldo com conversão explícita
      const valorNumerico = Number(valor)
      const saldoNumerico = Number(conta.saldo)

      if (valorNumerico > saldoNumerico) {
        throw new Error('Saldo insuficiente para realizar o investimento')
      }

      // Debita o valor da conta corrente
      conta.saldo = saldoNumerico - valorNumerico
      await conta.save()

      // Cria o investimento
      const investimento = new Investimento()
      investimento.useTransaction(trx)
      
      investimento.merge({
        conta_corrente_id: contaCorrenteId,
        tipo,
        valor_investido: valorNumerico,
        data: DateTime.now(),
        resgatado: false,
      })
      
      await investimento.save()
      return investimento
    })
  }

  // Resgata um investimento de volta pra conta corrente
  public static async resgatar(investimentoId: number, usuarioId: number) {
    return await db.transaction(async (trx) => {
      // Busca o investimento
      const investimento = await Investimento.findOrFail(investimentoId)
      investimento.useTransaction(trx)

      // Busca a conta vinculada ao investimento
      const conta = await ContaCorrente.findOrFail(investimento.conta_corrente_id)
      conta.useTransaction(trx)

      // Verifica se o investimento pertence ao usuário
      if (conta.usuario_id !== usuarioId) {
        throw new Error('Essa conta não pertence a você')
      }

      // Verifica se já foi resgatado
      if (investimento.resgatado) {
        throw new Error('Investimento já foi resgatado')
      }

      // Calcula o valor resgatado
      const valorResgatado = Number(investimento.valor_investido) * 1.5

      // Atualiza o saldo da conta
      const novoSaldo = Number(conta.saldo) + valorResgatado
      conta.saldo = novoSaldo
      await conta.save()

      // Marca o investimento como resgatado
      investimento.resgatado = true
      investimento.valor_resgatado = valorResgatado
      await investimento.save()

      return {
        valorResgatado,
        novoSaldo,
        investimento
      }
    })
  }
}