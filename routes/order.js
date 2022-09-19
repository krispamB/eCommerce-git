import { Router } from 'express'
const router = Router()
import { admin, protect } from '../middleware/authMiddleware.js'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUsersOrders,
  updateOrderToDelivered,
} from '../controller/order/orderController.js'

router.route('/').post(protect, addOrderItems)
router.route('/myOrders').get(protect, getUsersOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
