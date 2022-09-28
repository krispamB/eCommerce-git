import { Router } from 'express'
const router = Router()

router.get('/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

export default router