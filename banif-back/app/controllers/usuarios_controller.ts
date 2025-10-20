import Usuario from '#models/usuario'
import UsuarioPolicy from '#policies/usuario_policy'
import { createUsuarioValidator, updateUsuarioValidator } from '#validators/usuario'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsuariosController {
  async index({ response, bouncer }: HttpContext) {
    await bouncer.with(UsuarioPolicy).authorize('create')
    const usuarios = await Usuario.all()
    return response.ok({ data: usuarios })
  }

  async store({ request, response, bouncer }: HttpContext) {
    await bouncer.with(UsuarioPolicy).authorize('create')
    const payload = await request.validateUsing(createUsuarioValidator)
    payload.password = await hash.make(payload.password)
    const novoUsuario = await Usuario.create(payload)
    return response.created({ message: 'Usuário criado com sucesso', data: novoUsuario })
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
    target.merge(payload)
    await target.save()
    return response.ok({ message: 'Usuário atualizado com sucesso', data: target })
  }
}