// app/validators/investimento_validator.ts
import vine from '@vinejs/vine'

export const createInvestimentoValidator = vine.compile(
  vine.object({
    conta_corrente_id: vine.number(),
    investimentos_tipo: vine.string().trim(), // Ex: "Poupança", "Ações"
    investimentos_valor_investido: vine.number().min(1),
    investimentos_data: vine.date(), // formato ISO ou YYYY-MM-DD
  })
)

export const updateInvestimentoValidator = vine.compile(
  vine.object({
    conta_corrente_id: vine.number().optional(),
    investimentos_tipo: vine.string().trim().optional(),
    investimentos_valor_investido: vine.number().min(1).optional(),
    investimentos_data: vine.date().optional(),
  })
)