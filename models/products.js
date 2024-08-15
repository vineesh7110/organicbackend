const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image:String,
  title:String,
  
  price:String,
  cart:String

  });
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product