// app/policies/transacao_policy.ts
import ContaCorrente from '#models/conta_corrente'
import Transacao from '#models/transacao'
import Usuario from '#models/usuario'

export default class TransacaoPolicy {
  // Visualizar transação
  public async view(user: Usuario, transacao: Transacao, target: ContaCorrente) {
    if (user.is_gerente === true) return true
    return (
      transacao.conta_origem_id === Number(target.conta_corrente_id) ||
      transacao.conta_destino_id === Number(target.conta_corrente_id)
    )
  }
}