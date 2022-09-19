import asyncHandler from 'express-async-handler'
import User from '../../models/User.js'
import generateToken from '../../utils/generateToken.js'

/* 
@route   PUT api/user/profile
@desc    Update user profile
@access  Private
*/
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { updateUserProfile }
