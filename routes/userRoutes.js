

{/* const express = require('express')
const router = express()
const User = require('../models/user')

router.post('/', async (req, res) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, saltRounds);
      const user = new User({
        ...req.body,
        password: hash
      })
      await user.save()
  
      res.status(201).json(user)
      console.log(user)
    }
    catch (err) {
      res.status(400).send('invalid signup!')
    }
  
  })
  
  router.post('/', async (req, res) => {
   
    try {
      const email = req.body.email
      const password = req.body.password
      const user = await User.findOne({ email: email })
  
      if (!user) {
        return res.status(404).send("User not found")
      }
      const passwordsMatch = bcrypt.compareSync(password, user.password);
  
      if (!passwordsMatch) {
        return res.status(401).send("Login faild")
      }
      const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60,
      });
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false
      })
  
      res.status(200).json({message:"login successfull "})
  
    }
    catch (err) {
      console.log(err)
      res.status(400).send('invalid login!')
    }
  
  })
module.exports = router   */}