

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
       
       amount       :   { type : Number, require: true },
      
      
    },
    {timestamps: true},//created time updated time khud utha lega.
)
    
    

      

module.exports = mongoose.model('Payment',PaymentSchema)