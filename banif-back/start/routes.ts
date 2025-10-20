import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

const authController = new AuthController()

router.get('/', async () => {
  return { hello: 'world' }
})

// Auth routes (pqp sofri de mais pra fazer essas porra)
router.post('/register', async (ctx) => authController.register(ctx))
router.post('/login', async (ctx) => authController.login(ctx))
router.post('/logout', async (ctx) => authController.logout(ctx))
router.get('/me', async (ctx) => authController.me(ctx))
router.get('/tokens', async (ctx) => authController.tokens(ctx))
router.post('/tokens', async (ctx) => authController.createToken(ctx))