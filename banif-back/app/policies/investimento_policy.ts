// app/policies/investimento_policy.ts
import Investimento from '#models/investimento'
import Usuario from '#models/usuario'

export default class InvestimentoPolicy {
  public async view(user: Usuario, investimento: Investimento) {
    if (user.isGerente) return true
    return investimento.conta_corrente.usuario_id === user.id //verificar se esta certo
  }k

  public async create(user: Usuario, contaId: number) {
    // Só pode criar investimento em conta própria
    return user.isGerente || contaId === user.id
  }
}
