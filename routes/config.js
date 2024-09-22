import { Router } from 'express'
import { paystackWebhook } from '../controller/config/config.js'
const router = Router()

router.get('/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

router.get('/paystack', (req, res) => {
  res.send(process.env.PAYSTACK_PUBLIC)
})

router.post('/webhook', paystackWebhook)

export default router
