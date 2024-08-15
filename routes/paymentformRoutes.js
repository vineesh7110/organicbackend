const express = require('express')
const router = express()

const Payment = require('../models/paymentform')

router.post('/', async (req, res) => {
    try {
    const payment = new Payment(req.body)
      await payment.save()
  
      res.status(201).json(payment)
      console.log(payment)
    }
    catch (err) {
      res.status(500).send('invalid signup!')
    }
  
  })
  module.exports = router