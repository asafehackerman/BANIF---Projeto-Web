import ContaCorrente from '#models/conta_corrente'
import Usuario from '#models/usuario'

export default class ContaCorrenteService {
  // Cria automaticamente uma conta corrente para um usuário
  public static async createForUser(usuario: Usuario) {
  // Conta aleatória de 7 dígitos → formato 1.231-2
    let numeroConta = Math.floor(1000000 + Math.random() * 9000000).toString()
    numeroConta = numeroConta.replace(/(\d{1})(\d{3})(\d{2})/, '$1.$2-$3')

    // Agência aleatória de 6 dígitos → formato 12.312-3
    let agencia = Math.floor(100000 + Math.random() * 900000).toString()
    agencia = agencia.replace(/(\d{2})(\d{3})(\d{1})/, '$1.$2-$3')

    const conta = await ContaCorrente.create({
      usuario_id: usuario.id,
      numero_conta: numeroConta,
      agencia,
      saldo: 0,
      limite: 0,
    })

    return conta
  }


  public static async getByUsuario(usuarioId: number) {
    return ContaCorrente.query().where('usuario_id', usuarioId).first()
  }

  public static async updateConta(conta: ContaCorrente, data: Partial<ContaCorrente>) {
    conta.merge(data)
    await conta.save()
    return conta
  }
}
