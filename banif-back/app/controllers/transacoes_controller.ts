import ContaCorrente from '#models/conta_corrente'
import Investimento from '#models/investimento'
import Transacao from '#models/transacao'
import Usuario from '#models/usuario'
import { createTransacaoValidator, updateTransacaoValidator } from '#validators/transacao'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransacoesController {
  /**
   * GET /transacoes
   * Lista todas as transações com relações carregadas
   */
  async index({ response }: HttpContext) {
    try {
      const transacoes = await Transacao.query()
        .preload('usuario')
        .preload('contaOrigem')
        .preload('contaDestino')
        .preload('investimento')

      return response.ok(transacoes)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Erro ao listar transações' })
    }
  }

  /**
   * GET /transacoes/:id
   * Exibe uma transação específica
   */
  async show({ params, response }: HttpContext) {
    try {
      const transacao = await Transacao.query()
        .where('transacao_id', params.id)
        .preload('usuario')
        .preload('contaOrigem')
        .preload('contaDestino')
        .preload('investimento')
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

  /**
   * POST /transacoes
   * Cria uma nova transação
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createTransacaoValidator)

      // Verificar se o usuário existe
      const usuario = await Usuario.find(data.usuario_id)
      if (!usuario) {
        return response.badRequest({ message: 'Usuário não encontrado' })
      }

      // Se houver conta de origem, verificar se existe
      if (data.conta_origem_id) {
        const contaOrigem = await ContaCorrente.find(data.conta_origem_id)
        if (!contaOrigem) {
          return response.badRequest({ message: 'Conta de origem inválida' })
        }
      }

      // Se houver conta de destino, verificar se existe
      if (data.conta_destino_id) {
        const contaDestino = await ContaCorrente.find(data.conta_destino_id)
        if (!contaDestino) {
          return response.badRequest({ message: 'Conta de destino inválida' })
        }
      }

      // Se houver investimento, verificar se existe
      if (data.investimento_id) {
        const investimento = await Investimento.find(data.investimento_id)
        if (!investimento) {
          return response.badRequest({ message: 'Investimento inválido' })
        }
      }

      // Criar transação
      const transacao = await Transacao.create({
        usuario_id: data.usuario_id,
        conta_origem_id: data.conta_origem_id,
        conta_destino_id: data.conta_destino_id,
        investimento_id: data.investimento_id,
        tipo: data.transacao_tipo,
        valor: data.transacao_valor,
      })

      return response.created(transacao)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Erro ao criar transação', error })
    }
  }

  /**
   * PUT /transacoes/:id
   * Atualiza dados de uma transação
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const transacao = await Transacao.find(params.id)
      if (!transacao) {
        return response.notFound({ message: 'Transação não encontrada' })
      }

      const data = await request.validateUsing(updateTransacaoValidator)

      transacao.merge({
        conta_origem_id: data.conta_origem_id ?? transacao.conta_origem_id,
        conta_destino_id: data.conta_destino_id ?? transacao.conta_destino_id,
        investimento_id: data.investimento_id ?? transacao.investimento_id,
        tipo: data.transacao_tipo ?? transacao.tipo,
        valor: data.transacao_valor ?? transacao.valor,
      })

      await transacao.save()
      return response.ok(transacao)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Erro ao atualizar transação', error })
    }
  }

  /**
   * DELETE /transacoes/:id
   * Remove uma transação
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const transacao = await Transacao.find(params.id)
      if (!transacao) {
        return response.notFound({ message: 'Transação não encontrada' })
      }

      await transacao.delete()
      return response.ok({ message: 'Transação deletada com sucesso' })
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Erro ao deletar transação' })
    }
  }
}
