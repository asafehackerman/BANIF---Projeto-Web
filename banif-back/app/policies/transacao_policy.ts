// app/policies/transacao_policy.ts
import Transacao from '#models/transacao'
import Usuario from '#models/usuario'

export default class TransacaoPolicy {
  // Visualizar transação
  public async view(user: Usuario, transacao: Transacao) {
    if (user.is_gerente === true) return true
    return (
      transacao.conta_origem_id === user.id ||
      transacao.conta_destino_id === user.id
    )
  }

  // Criar transação (transferência ou investimento)
  public async create(user: Usuario, contaOrigemId: number) {
    return user.is_gerente === true  || contaOrigemId === user.id
  }

}