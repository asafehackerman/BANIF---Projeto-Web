// app/validators/transacao_validator.ts
import vine from '@vinejs/vine'

export const createTransacaoValidator = vine.compile(
  vine.object({
    usuario_id: vine.number(), // quem realizou
    conta_origem_id: vine.number().optional(), // conta que envia
    conta_destino_id: vine.number().optional(), // conta que recebe
    investimento_id: vine.number().optional(), // se for relacionada a investimento
    transacao_tipo: vine.enum(['Pix', 'Aplicação', 'Resgate']),
    transacao_valor: vine.number().min(0.01),
  })
)

export const updateTransacaoValidator = vine.compile(
  vine.object({
    conta_origem_id: vine.number().optional(),
    conta_destino_id: vine.number().optional(),
    investimento_id: vine.number().optional(),
    transacao_tipo: vine.enum(['Pix', 'Aplicação']).optional(),
    transacao_valor: vine.number().min(0.01).optional(),
  })
)
