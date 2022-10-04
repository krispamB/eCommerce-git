import asyncHandler from 'express-async-handler'
import User from '../../models/User.js'

/* 
@route   GET api/user
@desc    Get all users

*/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

/* 
@route   GET api/user/:id
@desc    Get user by ID
@access  Private/Admin
*/
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/* 
@route   PUT api/user/:id
@desc    Update user
@access  Private/Admin
*/
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.isAdmin) {
      user.isAdmin = req.body.isAdmin
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { getUsers, getUserById, updateUser }
