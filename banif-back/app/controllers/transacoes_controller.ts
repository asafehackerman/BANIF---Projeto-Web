// app/controllers/transacoes_controller.ts
import Transacao from '#models/transacao'
import { TransacaoService } from '#services/transacao_service'
import { createTransacaoValidator } from '#validators/transacao'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransacoesController {
  public async index({ response }: HttpContext) {
    try {
      const transacoes = await Transacao.query()
        .preload('usuario')
        .preload('contaOrigem')
        .preload('contaDestino')

      return response.ok(transacoes)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Erro ao listar transações' })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const transacao = await Transacao.query()
        .where('transacao_id', params.id)
        .preload('usuario')
        .preload('contaOrigem')
        .preload('contaDestino')
        .first()

      if (!transacao) {
        return response.notFound({ message: 'Transação não encontrada' })
      }

      return response.ok(transacao)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Erro ao buscar transação' })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const { conta_origem_id, conta_destino_id, transacao_valor } =
        await request.validateUsing(createTransacaoValidator)

      const valor = Number(transacao_valor)

      if (!conta_origem_id || !conta_destino_id) {
        return response.badRequest({ message: 'Contas inválidas' })
      }

      const result = await TransacaoService.fazerPix(conta_origem_id, conta_destino_id, valor)

      return response.created(result)
    } catch (error: any) {
      return response.badRequest({ message: error.message || 'Erro ao processar Pix' })
    }
  }
}
