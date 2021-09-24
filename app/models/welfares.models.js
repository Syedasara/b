

const mongoose = require('mongoose')
const bcrypt=require("bcrypt")
const Schema = mongoose.Schema;

const WelfareSchema = new Schema(
    {
       welfareName       :   { type : String, require: true },
       welfareAddress       :   { type : String, require: true },
       postalCode       :   { type : Number, require: true },
       firstName       :   { type : String, require: true },
       lastName       :   { type : String, require: true },
       CNIC      :   { type : String, require: true },
       accountNo       :   { type : String, require: true },
email :   { type : String, require: true, unique: true },
contactNo       :   { type : Number, require: true },
password : { type : String, require: true},
     
       
      
    },
    {timestamps: true},//created time updated time khud utha lega.
)
    WelfareSchema.pre('save',function(next){
        const welfare=this;
        if(!welfare.isModified('password')){
            return next()
        }
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                return next(err)}

                bcrypt.hash(welfare.password,salt,(err,hash)=>{
                    if(err){
                        return next(err)
                }
                welfare.password=hash;
                next()
            })
            })
          
          
        })

    
    

      
WelfareSchema.methods.comparePassword=function(candidatePassword){
const welfares=this;
console.log(welfares.password)
console.log(welfares.email)
console.log(candidatePassword)
return new Promise((resolve,reject)=>{
    bcrypt.compare(candidatePassword,welfares.password,(err,isMatch)=>{
        if(err){
            return console.log('some issue')
        }
        if(!isMatch){
            return  console.log('pass not match')
        }
      resolve(true)
        // return res.status(201).send({message:"success"})
    })
})
}
// UserSchema.methods.findUserByCredentials=function(email,password){
//     const user =this;
// console.log(user.password)
//     user.findOne({email}).then((user)=>{
//         if(!user){
//             console.log("reject")
//         }
//         else{ 
//             return new Promise((resolve,reject)=>{
//             bcrypt.compare(password,user.password,(err,res)=>{
//                 if(res){
//                resolve(user);
//                 }
//                 else{
//                     console.log("reject")
//                 }
//             })
//         })
//         }
//     })
// }
module.exports = mongoose.model('Welfares',WelfareSchema)