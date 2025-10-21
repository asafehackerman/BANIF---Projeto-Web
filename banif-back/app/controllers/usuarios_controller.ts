import Usuario from '#models/usuario'
import UsuarioPolicy from '#policies/usuario_policy'
import ContaCorrenteService from '#services/conta_corrente_service'
import { createUsuarioValidator, updateUsuarioValidator } from '#validators/usuario'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsuariosController {
  async index({ response, bouncer }: HttpContext) {
    await bouncer.with(UsuarioPolicy).authorize('viewAny')
    const usuarios = await Usuario.all()
    return response.ok({ data: usuarios })
  }

  async store({ request, response, bouncer }: HttpContext) {
  await bouncer.with(UsuarioPolicy).authorize('create')
  const payload = await request.validateUsing(createUsuarioValidator)

  if (payload.cpf) {
    const onlyDigits = String(payload.cpf).replace(/\D/g, '')
    payload.cpf = onlyDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  if (payload.endereco) payload.endereco = String(payload.endereco).trim()
  payload.password = await hash.make(payload.password)

  const novoUsuario = await Usuario.create(payload)

  // Cria automaticamente a conta corrente
  const conta = await ContaCorrenteService.createForUser(novoUsuario)

  return response.created({
    message: 'Usuário criado com sucesso',
    data: { usuario: novoUsuario, conta_corrente: conta }
  })
}

  async show({ params, response, bouncer }: HttpContext) {
    const target = await Usuario.findOrFail(params.id)
    await bouncer.with(UsuarioPolicy).authorize('view', target)
    return response.ok({ data: target })
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const target = await Usuario.findOrFail(params.id)
    await bouncer.with(UsuarioPolicy).authorize('view', target)
    const payload = await request.validateUsing(updateUsuarioValidator)

    if (payload.password) payload.password = await hash.make(payload.password)

    // Mantém consistência do CPF e endereço também ao atualizar
    if (payload.cpf) {
      const onlyDigits = String(payload.cpf).replace(/\D/g, '')
      payload.cpf = onlyDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    if (payload.endereco) payload.endereco = String(payload.endereco).trim()

    target.merge(payload)
    await target.save()
    return response.ok({ message: 'Usuário atualizado com sucesso', data: target })
  }
}
