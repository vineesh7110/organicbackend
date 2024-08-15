
const express = require('express')
const router = express()
const Product = require('../models/products')

router.post('/', async (req, res) => {
    try {
    const product = new Product(req.body)
      await product.save()
  
      res.status(201).json(product)
      console.log(user)
    }
    catch (err) {
      res.status(500).send('invalid signup!')
    }
  
  })

  router.get('/', async (req, res, next) =>{
    try {
  
      const products = await Product.find({});
      res.status(200).json(products)
  
    }
    catch (error) {
      res.status(500).send('error occured')
    }
  })


  router.get('/:productsId', async (req, res, next) =>{
    try {
  
      const products = await Product.findById(req.params.productsId).exec();
      res.status(200).json(products)
  
    }
    catch (error) {
      res.status(404).send('product of given id not found!')
    }
  })

 
  module.exports = router