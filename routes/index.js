import { Router } from 'express'
import product from './product.js'
import user from './user.js'
import order from './order.js'
import upload from './uploadRoute.js'

const router = Router()

router.use('/product', product)
router.use('/user', user)
router.use('/order', order)
router.use('/upload', upload)

export default router
