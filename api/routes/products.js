const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')
/*
get, post '/'
get, patch, delete '/:id'
*/

// get all products
router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({message: 'no records'})
      }
    })
})
// post new product
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product
    .save()
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))

  res.status(201).json({
    message: 'Handling POST requests to /products',
    createdProduct: product
  })
})
// get product by id
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product
    .findById(id)
    .exec()
    .then(doc => {
      console.log('From Database:', doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({message: 'id not found'})
      }
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json({error: err})
    })
})

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'PATCH Product ID'
  })
})
// delete product by id
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product
    .remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(e => {
      console.log(e)
      res.status(500).json({
        error: e
      })
    })
})
module.exports = router
