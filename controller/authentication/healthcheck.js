import asyncHandler from 'express-async-handler'
/* 
@route   GET api
@desc    APP health check
@access  Public
*/
export const healthCheck = asyncHandler(async (req, res) => {
  res.json({
    message: 'API healthy!!!',
  })
})
