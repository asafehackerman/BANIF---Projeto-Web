// app/policies/usuario_policy.ts
import Usuario from '#models/usuario'

export default class UsuarioPolicy {
  public async create(user: Usuario) {
    return !!user.is_gerente  // converte 0/1 para boolean
  }

  public async view(user: Usuario, target: Usuario) {
    if (!!user.is_gerente) return true
    return user.id === target.id
  }

  public async viewAny(user: Usuario) {
    return !!user.is_gerente
  }
}
