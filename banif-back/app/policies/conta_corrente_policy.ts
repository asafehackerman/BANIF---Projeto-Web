// app/policies/conta_corrente_policy.ts
import ContaCorrente from '#models/conta_corrente';
import { Usuario } from '#models/usuario';

export default class ContaCorrentePolicy {
  // Ver se o usuário pode ver a conta
  public async view(user: Usuario, conta: ContaCorrente) {
    if (user.is_gerente === true) return true // gerente pode ver todas
    return user.id === conta.usuario_id // cliente só a própria
  }

  // Ver se o usuário pode editar a conta
  public async update(user: Usuario, conta: ContaCorrente) {
    if (user.is_gerente === true) return true
    return user.id === conta.usuario_id
  }

  // Ver se o usuário pode deletar a conta
  public async delete(user: Usuario, conta: ContaCorrente) {
    if (user.is_gerente === true) return true
    return user.id === conta.usuario_id
  }
}
