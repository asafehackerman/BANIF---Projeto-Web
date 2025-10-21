import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Rota raiz de teste
router.get('/', async () => {
  return { hello: 'world' }
})

// Rotas de autenticação
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
  router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
  router.get('/tokens', '#controllers/auth_controller.tokens').use(middleware.auth())
  router.post('/tokens', '#controllers/auth_controller.createToken').use(middleware.auth())
}).prefix('/auth')

// Rotas de usuários (admin/gerente)
router.group(() => {
  router.get('/', '#controllers/usuarios_controller.index').use(middleware.auth())         // Lista todos os usuários
  router.get('/:id', '#controllers/usuarios_controller.show').use(middleware.auth())      // Mostra um usuário
  router.post('/', '#controllers/usuarios_controller.store').use(middleware.auth())       // Cria um usuário
  router.put('/:id', '#controllers/usuarios_controller.update').use(middleware.auth())    // Atualiza um usuário
}).prefix('/usuarios')

// Rotas de contas correntes
router.group(() => {
  router.get('/', '#controllers/conta_correntes_controller.index').use(middleware.auth())         // Lista todas as contas (gerente)
  router.get('/:id', '#controllers/conta_correntes_controller.show').use(middleware.auth())      // Mostra uma conta específica
  router.post('/', '#controllers/conta_correntes_controller.store').use(middleware.auth())       // Cria uma conta (gerente)
  router.put('/:id', '#controllers/conta_correntes_controller.update').use(middleware.auth())    // Atualiza uma conta (gerente)
}).prefix('/contas_correntes')

// Rotas de transações
router.group(() => {
  router.get('/showall', '#controllers/transacoes_controller.index').use(middleware.auth())          // Lista todas
  router.get('/:id', '#controllers/transacoes_controller.show').use(middleware.auth())       // Mostra uma
  router.post('/pix', '#controllers/transacoes_controller.store').use(middleware.auth())       // Cria Pix ou Aplicação
}).prefix('/transactions')

// Rotas de investimentos
router.group(() => {
  router.get('/listar/:conta_corrente_id', '#controllers/investimentos_controller.listar').use(middleware.auth()) // Lista todos os investimentos de uma conta
  router.post('/aplicar', '#controllers/investimentos_controller.aplicar').use(middleware.auth())                // Aplica um investimento
  router.post('/resgatar/:id', '#controllers/investimentos_controller.resgatar').use(middleware.auth())          // Resgata um investimento
}).prefix('/investimentos')