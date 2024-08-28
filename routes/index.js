import { Router } from 'express'
import product from './product.js'
import user from './user.js'
import order from './order.js'
import upload from './uploadRoute.js'
import config from './config.js'
import { healthCheck } from '../controller/authentication/healthcheck.js'

const router = Router()

router.use('/product', product)
router.use('/user', user)
router.use('/order', order)
router.use('/upload', upload)
router.use('/config', config)
router.get('/', healthCheck)

export default router
