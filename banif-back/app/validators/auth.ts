// app/validators/auth.ts
import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4),
    email: vine.string().trim().email().unique({ table: 'usuarios', column: 'email' }),
    password: vine.string().minLength(8),
    cpf: vine.string().trim().minLength(11).maxLength(14).unique({ table: 'usuarios', column: 'cpf' }),
    endereco: vine.string().trim(), // agora é apenas um campo único
    is_gerente: vine.boolean().optional(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(8),
  })
)