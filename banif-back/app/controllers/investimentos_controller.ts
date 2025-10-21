// app/controllers/investimento_controller.ts
import ContaCorrente from '#models/conta_corrente'
import Investimento from '#models/investimento'
import { createInvestimentoValidator } from '#validators/investimento'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class InvestimentoController {
  // Aplicar investimento
  public async aplicar({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createInvestimentoValidator)
    const user = await auth.use('api').authenticate()

    // Pega a conta do usuário
    const conta = await ContaCorrente.findOrFail(payload.conta_corrente_id)
    if (conta.usuario_id !== user.id) {
      return response.unauthorized({ message: 'Essa conta não pertence a você' })
    }

    // Checa saldo
    if (payload.investimentos_valor_investido > conta.saldo) {
      return response.badRequest({ message: 'Saldo insuficiente para investir' })
    }

    // Deduz do saldo da conta
    conta.saldo -= payload.investimentos_valor_investido
    await conta.save()


// Supondo que payload.investimentos_data é Date
const dataDateTime = DateTime.fromJSDate(payload.investimentos_data)

// Criando o investimento
const investimento = await Investimento.create({
  conta_corrente_id: conta.conta_corrente_id,
  tipo: payload.investimentos_tipo,
  valor_investido: payload.investimentos_valor_investido,
  data: dataDateTime,
})


    return response.created({ message: 'Investimento realizado com sucesso', data: investimento })
  }

  // Listar investimentos de uma conta
  public async listar({ params, auth, response }: HttpContext) {
    const user = await auth.use('api').authenticate()
    const conta = await ContaCorrente.findOrFail(params.conta_corrente_id)

    if (conta.usuario_id !== user.id) {
      return response.unauthorized({ message: 'Essa conta não pertence a você' })
    }

    const investimentos = await Investimento.query().where('conta_corrente_id', conta.conta_corrente_id)
    return response.ok({ data: investimentos })
  }

  // Resgatar investimento
  public async resgatar({ params, auth, response }: HttpContext) {
    const user = await auth.use('api').authenticate()

    // Busca o investimento
    const investimento = await Investimento.findOrFail(params.id)

    // Busca a conta associada
    const conta = await ContaCorrente.findOrFail(investimento.conta_corrente_id)

    // Verifica se a conta pertence ao usuário autenticado
    if (conta.usuario_id !== user.id) {
      return response.unauthorized({ message: 'Essa conta não pertence a você' })
    }

    // Calcula valor resgatado com multiplicador
    const valorResgatado = investimento.valor_investido * 1.5

    // Atualiza o saldo da conta
    conta.saldo += valorResgatado
    await conta.save()

    // Marca o investimento como resgatado
    investimento.resgatado = true
    investimento.valor_resgatado = valorResgatado
    await investimento.save()

    return response.ok({
      message: 'Investimento resgatado com sucesso',
      valorResgatado,
    })
  }
}
