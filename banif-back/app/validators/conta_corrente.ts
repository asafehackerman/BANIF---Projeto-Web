// app/validators/conta_corrente_validator.ts
import vine from '@vinejs/vine'

export const createContaCorrenteValidator = vine.compile(
  vine.object({
    contas_correntes_numero_conta: vine.number(),
    contas_correntes_agencia: vine.number(),
    contas_correntes_saldo: vine.number().min(0),
    contas_correntes_limite: vine.number().min(0),
    usuario_id: vine.number(), // FK com usuarios.id
  })
)

export const updateContaCorrenteValidator = vine.compile(
  vine.object({
    contas_correntes_numero_conta: vine.number().optional(),
    contas_correntes_agencia: vine.number().optional(),
    contas_correntes_saldo: vine.number().min(0).optional(),
    contas_correntes_limite: vine.number().min(0).optional(),
    usuario_id: vine.number().optional(),
  })
)
