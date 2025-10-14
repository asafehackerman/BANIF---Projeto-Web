// app/policies/usuario_policy.ts
import Usuario from '#models/usuario'

export default class UsuarioPolicy {
  // Apenas gerente pode criar usuários
  public async create(user: Usuario) {
    return user.is_gerente === true
  }

  // Gerente pode ver todos, cliente só o próprio
  public async view(user: Usuario, target: Usuario) {
    if (user.is_gerente === true) return true
    return user.id === target.id
  }
}
