import asyncHandler from 'express-async-handler'
import User from '../../models/User.js'

/* 
@route   DELETE api/user/:id
@desc    Delete user
@access  Private/Admin
*/
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { deleteUser }