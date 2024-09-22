import { createHmac } from 'crypto'
import asyncHandler from 'express-async-handler'
import Order from '../../models/Order.js'

export const paystackWebhook = asyncHandler(async (req, res) => {
  const hash = createHmac('sha512', process.env.PAYSTACK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (hash != req.headers['x-paystack-signature']) {
    return res.status(403).json({ message: `Invalid Signature` })
  }

  const payload = req.body

  switch (payload.event) {
    case 'charge.success':
      {
        const orderId = payload.data.reference
        await Order.findByIdAndUpdate(orderId, {
          isPaid: true,
          paidAt: Date.now(),
        })
      }
      break

    default:
      console.log(`Unhandled event received ${payload.event}`)
  }

  return res.json({ message: 'Payload Received' })
})
