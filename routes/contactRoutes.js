const express = require('express')
const router = express()
const Contact = require('../models/contact')

router.post('/', async (req, res) => {
    try {
    const contact = new Contact(req.body)
      await contact.save()
  
      res.status(201).json(contact)
      console.log(contact)
    }
    catch (err) {
      res.status(500).send('invalid signup!')
    }
  
  })
  module.exports = router