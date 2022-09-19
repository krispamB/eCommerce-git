import { Router } from 'express'
import {
  getUserById,
  getUsers,
  updateUser,
} from '../controller/admin/adminConterller.js'
import { deleteUser } from '../controller/authentication/delete.js'
const router = Router()
import { authUser, getUserProfile } from '../controller/authentication/login.js'
import { updateUserProfile } from '../controller/authentication/profile.js'
import { registerUser } from '../controller/authentication/register.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
