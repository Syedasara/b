

const mongoose = require('mongoose')
const bcrypt=require("bcrypt")
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name       :   { type : String, require: true },
        email :   { type : String, require: true, unique: true },
        password : { type : String, require: true},
        
     
       
     
    },
    {timestamps: true},//created time updated time khud utha lega.
)
    UserSchema.pre('save',function(next){
        const user=this;
        if(!user.isModified('password')){
            return next()
        }
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                return next(err)}

                bcrypt.hash(user.password,salt,(err,hash)=>{
                    if(err){
                        return next(err)
                }
                user.password=hash;
                next()
            })
            })
          
          
        })

    
    

      
UserSchema.methods.comparePassword=function(candidatePassword){
const users=this;
console.log(users.password)
console.log(users.email)
console.log(candidatePassword)
return new Promise((resolve,reject)=>{
    bcrypt.compare(candidatePassword,users.password,(err,isMatch)=>{
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
module.exports = mongoose.model('Users',UserSchema)