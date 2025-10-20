// app/validators/usuario_validator.ts
import vine from '@vinejs/vine'

export const createUsuarioValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4),
    email: vine.string().trim().email().unique({ table: 'usuarios', column: 'email' }),
    password: vine.string().minLength(8),
    cpf: vine.string().trim().minLength(11).maxLength(14).unique({ table: 'usuarios', column: 'cpf' }),
    endereco: vine.string().trim(),
    is_gerente: vine.boolean().optional(),
  })
)

export const updateUsuarioValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).optional(),
    email: vine.string().trim().email().optional(),
    password: vine.string().minLength(8).optional(),
    cpf: vine.string().trim().minLength(11).maxLength(14).optional(),
    endereco: vine.string().trim().optional(),
    is_gerente: vine.boolean().optional(),
  })
)
