import vine from '@vinejs/vine'

export const createContaCorrenteValidator = vine.compile(
  vine.object({
    usuario_id: vine.number(),
    saldo: vine.number().min(0).optional(),
    limite: vine.number().min(0).optional(),
  })
)


export const updateContaCorrenteValidator = vine.compile(
  vine.object({
    usuario_id: vine.number().optional(),
    saldo: vine.number().min(0).optional(),
    limite: vine.number().min(0).optional(),
  })
)
