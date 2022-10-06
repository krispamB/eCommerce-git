import asyncHandler from 'express-async-handler'
import Product from '../../models/Product.js'

/* 
@route   GET api/product
@desc    GET all products
@access  Public
*/
const getProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}

    const products = await Product.find({ ...keyword })

    res.status(200).json(products)
  } catch (error) {
    console.error(error)
  }
})

/* 
@route   GET api/product/:id
@desc    GET products by id
@access  Public
*/
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  } else {
    res.status(200).json(product)
  }
})

/* 
@route   DELETE api/product/:id
@desc    Delete product 
@access  Private/Admin
*/
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  } else {
    await product.remove()
    res.json({ message: 'Product Removed' })
  }
})

/* 
@route   POST api/product
@desc    Create product 
@access  Private/Admin
*/
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image:
      'https://res.cloudinary.com/dnpvndlmy/image/upload/v1662458420/cld-sample-5.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

/* 
@route   PUT api/product/:id
@desc    Update Product 
@access  Private/Admin
*/
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock, image } = req.body
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  } else {
    product.name = name
    product.price = price
    product.image = image
    product.description = description
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  }
})

/* 
@route   POST api/product/:id/review
@desc    Create new review
@access  Private
*/
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  } else {
    console.log(product)
    const alreadyReveiwed = product.reveiws.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReveiwed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const reveiw = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }

    product.reveiws.push(reveiw)

    product.numReveiws = product.reveiws.length

    product.rating =
      product.reveiws.reduce((acc, item) => item.rating + acc, 0) /
      product.reveiws.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  }
})

/* 
@route   GET api/product/top
@desc    Get top rated products
@access  Public
*/
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)

})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
}
