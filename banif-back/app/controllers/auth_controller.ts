import Usuario from '#models/usuario'
import ContaCorrenteService from '#services/conta_corrente_service'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { permissions } from '../utils/permissions.js'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)

      if (payload.cpf) {
        const onlyDigits = String(payload.cpf).replace(/\D/g, '')
        payload.cpf = onlyDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      }

      const user = await Usuario.create({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        cpf: payload.cpf,
        endereco: payload.endereco,
        is_gerente: payload.is_gerente ?? false,
      })

      // Cria automaticamente a conta corrente
      const conta = await ContaCorrenteService.createForUser(user)

      const token = await Usuario.accessTokens.create(user, ['*'], {
        name: 'Registration Token',
        expiresIn: '30 days',
      })

      return response.created({
        message: 'Usuário registrado com sucesso',
        data: { user, conta_corrente: conta },
        token: {
          type: 'bearer',
          value: token.value!.release(),
          expiresAt: token.expiresAt,
        },
        permissions: { ...permissions[user.is_gerente ? 1 : 0] },
      })
    } catch (error: any) {
      return response.badRequest({
        message: 'Erro ao registrar usuário',
        errors: error.messages || error.message,
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await Usuario.findBy('email', email)
      if (!user) return response.unauthorized({ message: 'Credenciais inválidas' })
      const isPasswordValid = await user.verifyPassword(password)
      if (!isPasswordValid) return response.unauthorized({ message: 'Credenciais inválidas' })

      const token = await Usuario.accessTokens.create(user, ['*'], {
        name: 'Login Token',
        expiresIn: '30 days',
      })

      return response.ok({
        message: 'Login realizado com sucesso',
        user: { id: user.id, username: user.username, email: user.email, is_gerente: user.is_gerente },
        token: { type: 'bearer', value: token.value!.release(), expiresAt: token.expiresAt },
        permissions: { ...permissions[user.is_gerente ? 1 : 0] },
      })
    } catch {
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }
  }

  async logout({ auth, response }: HttpContext) {
  try {
    // Autentica o token que veio no header
    const user = await auth.use('api').authenticate()

    // Pega o token atual
    const token = user.currentAccessToken

    if (!token) {
      return response.unauthorized({ message: 'Token inválido' })
    }

    // Deleta apenas o token atual
    await Usuario.accessTokens.delete(user, token.identifier)

    return response.ok({ message: 'Logout realizado com sucesso' })
  } catch (error) {
    console.error('Erro no logout:', error)
    return response.unauthorized({ message: 'Token inválido' })
  }
}


  async me({ auth, response }: HttpContext) {
    try {
      const user = await auth.use('api').authenticate()
      return response.ok({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          is_gerente: user.is_gerente,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
    } catch {
      return response.unauthorized({ message: 'Token inválido' })
    }
  }

  async tokens({ auth, response }: HttpContext) {
    try {
      const user = await auth.use('api').authenticate()
      const tokens = await Usuario.accessTokens.all(user)
      return response.ok({
        tokens: tokens.map((token) => ({
          name: token.name,
          type: token.type,
          abilities: token.abilities,
          lastUsedAt: token.lastUsedAt,
          expiresAt: token.expiresAt,
          createdAt: token.createdAt,
        })),
      })
    } catch {
      return response.unauthorized({ message: 'Token inválido' })
    }
  }

  async createToken({ auth, request, response }: HttpContext) {
    try {
      const user = await auth.use('api').authenticate()
      const { name, abilities, expiresIn } = request.only(['name', 'abilities', 'expiresIn'])

      const token = await Usuario.accessTokens.create(user, abilities || ['*'], {
        name: name || 'API Token',
        expiresIn: expiresIn || '30 days',
      })

      return response.created({
        message: 'Token criado com sucesso',
        token: {
          type: 'bearer',
          value: token.value!.release(),
          name: token.name,
          abilities: token.abilities,
          expiresAt: token.expiresAt,
        },
      })
    } catch (error: any) {
      return response.badRequest({ message: 'Erro ao criar token', error: error.message })
    }
  }
}
