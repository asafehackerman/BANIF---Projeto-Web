// arquivo: utils/permissoes.ts

interface Permissions {
  criarConta: boolean
  verConta: boolean
  editarConta: boolean
  deletarConta: boolean
  fazerTransacao: boolean
}

export const permissions: { [key: string]: Permissions } = {
  0: { // usuário normal
    criarConta: false,
    verConta: true,
    editarConta: false,
    deletarConta: false,
    fazerTransacao: true,
  },
  1: { // gerente
    criarConta: true,
    verConta: true,
    editarConta: true,
    deletarConta: true,
    fazerTransacao: true,
  },
}

/**
 * Função para retornar as permissões de um usuário baseado no is_gerente
 */
export function getUserPermissions(is_gerente: boolean) {
  return is_gerente ? permissions[1] : permissions[0]
}
