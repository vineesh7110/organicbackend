const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('./models/user')
const Product = require('./models/products')
const Contact = require('./models/contact')
const Cart = require('./models/cart')
const Payment = require('./models/paymentform')
const contactRoutes = require('./routes/contactRoutes')
const productRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')
const paymentRoutes = require('./routes/paymentformRoutes')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express()
const port = 3000

const cors = require('cors')

require('dotenv').config()
app.use(cors({
  origin:["https://organicfrontend.vercel.app/"],
  methods:["GET","POST","PATCH","DELETE"],
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products',productRoutes)
app.use('/contact',contactRoutes)
app.use('/products/:productsId',productRoutes)
app.use('/cart',cartRoutes)
app.use('/form',paymentRoutes)

app.post('/users/signup', async (req, res) => {
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

app.post('/users/login', async (req, res) => {
 
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

    res.status(200).json({message:"login successfull",user: {_id: user._id, name: user.name} })

  }
  catch (err) {
    console.log(err)
    res.status(400).send('invalid login!')
  }

})


app.post('/users/verify', async (req, res) => {

  const token = req.cookies.token
  if(!token){
    return res.status(401).send("User not Logged in")
  }
  return res.status(200).send("User is Logged in")

})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



main().then(() => console.log("DB Connected")).catch(err => console.log(err));

async function main() {
  const url = process.env.DB_URL
  const password = process.env.DB_PASSWORD
  const urlwithpassword = url.replace('<password>', password)

  await mongoose.connect(urlwithpassword);

  // use `await mongoose.connect('mongodb://user: password@127.0.0.1:27017/test');` if your database has auth enabled
}