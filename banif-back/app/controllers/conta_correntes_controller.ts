import ContaCorrente from '#models/conta_corrente'
import ContaCorrentePolicy from '#policies/conta_corrente_policy'
import ContaCorrenteService from '#services/conta_corrente_service'
import { updateContaCorrenteValidator } from '#validators/conta_corrente'
import type { HttpContext } from '@adonisjs/core/http'

export default class ContaCorrenteController {
  async index({ auth, response }: HttpContext) {
    const user = await auth.use('api').authenticate()
    
    // Gerente vê todas, cliente só a própria
    if (user.is_gerente) {
      const contas = await ContaCorrente.all()
      return response.ok({ data: contas })
    } else {
      const conta = await ContaCorrenteService.getByUsuario(user.id)
      return response.ok({ data: conta ? [conta] : [] })
    }
  }

  async show({ params, auth, response, bouncer }: HttpContext) {
    const user = await auth.use('api').authenticate()
    const conta = await ContaCorrente.findOrFail(params.id)
    await bouncer.with(ContaCorrentePolicy).authorize('view', conta)
    return response.ok({ data: conta })
  }

  // Cria conta corrente automática usando o Service
  async store({ request, response, auth }: HttpContext) {
    const user = await auth.use('api').authenticate()
    
    // Cria automaticamente a conta para o usuário autenticado
    const conta = await ContaCorrenteService.createForUser(user)

    return response.created({ message: 'Conta corrente criada com sucesso', data: conta })
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const conta = await ContaCorrente.findOrFail(params.id)
    await bouncer.with(ContaCorrentePolicy).authorize('view', conta)

    const payload = await request.validateUsing(updateContaCorrenteValidator)
    const updated = await ContaCorrenteService.updateConta(conta, payload)

    return response.ok({ message: 'Conta corrente atualizada com sucesso', data: updated })
  }
}
