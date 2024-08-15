const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    email: {
      type:String,
      required:true
   },
   country:{
       type:String,
       required:true
   },
   firstname:{
       type:String,
       required:true
   },
   lastname:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  apartment:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  pincode:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  }
  


  
  
    });
    const Payment = mongoose.model('Payment', paymentSchema);
    module.exports = Payment