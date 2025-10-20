// app/policies/investimento_policy.ts
import ContaCorrente from '#models/conta_corrente'
import Investimento from '#models/investimento'
import Usuario from '#models/usuario'

export default class InvestimentoPolicy {
  public async view(user: Usuario, investimento: Investimento, conta: ContaCorrente) {
    if (user.is_gerente === true) return true
    return investimento.conta_corrente_id === conta.conta_corrente_id
  }

  public async create(user: Usuario, conta: ContaCorrente) {
    // Só pode criar investimento em conta própria
    return user.is_gerente === true || user.id === conta.usuario_id
  }
}