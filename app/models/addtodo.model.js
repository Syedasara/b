

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddTodoSchema = new Schema(
  {
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      },
    name : { type : String, require: true },
    
    amount:{ type : Number, require: true },
   data:{type:String}
    
  },
  {timestamps: true}//created time updated time khud utha lega.
)
module.exports = mongoose.model('AddTodos',AddTodoSchema)