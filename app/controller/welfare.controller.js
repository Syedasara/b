const { request } = require("express")
const { mongoose } = require("../models")
const db = require("../models")
const bcrypt=require("bcrypt")
const Welfares= db.Welfares

// const AdPost = db.adpost;

exports.signin =async(req,res)=>{

  try{
    const{email,password}=req.body
    if(!email || !password){
      return res.status(402).json({error:"pleasee fill all fields "}) 
    }
    const userLogin=await Welfares.findOne({email:email})


const isMatch= await bcrypt.compare(password,userLogin.password);
        if(!isMatch){
         
          return  res.status(400).send({error:"password is incorrect"}) 
         }
         else{
          // console.log('whole dataset is===>',userLogin)
          return res.status(201).json({message:"successfullty login",data:userLogin}) 
        }
    
    // const isMatch=await bcrypt.compare(password,userLogin.password);
    // if(!isMatch){
    //  return  res.status(400).json({error:"invalid password "}) 
    // }
    // else{

    //   return res.status(201).json({message:"successfullty login",data:data}) 
    // }
  } catch(err){
    console.log(err)
    return  res.status(401).send({error:"email is incorrect"}) 
  }
}
const handleErrors=(err)=>{
  // console.log(err.message,error.code);
  // let errors={email:'',password:''};
  if(err.code===400){
      errors.password="password is incorrect";
      return errors;
  }
}
// console.log(req.body)
//   const email=req.body.email
//   const password=req.body.password
//   if(!email|| !password){
//     return res.status(422).send({error:"must provide email or pass "})
//   }
//   const user= Users.findOne({email},(err,data)=>{
//   console.log(user)
//   if (err){ 
//           return res.status(500).send({ message: err });
//       }
//   if(!user){
//     return res.status(422).send({error:"email not found "})
//   }
//   if(data!==null){
//    await user.comparePassword(password)
//        return res.status(201).send({message:"success",data: data})
//   }
// })
//   try{

//  await user.comparePassword(password)
//        return res.status(201).send({message:"success",data: data})
// }catch(err){
//   return res.status(421).send({error:"pass not found "})
// }
  // const{email,password}=req.body
  // console.log(req.body)
  // if (!req.body){
  //     return res.status(400).send({message : "Bad Request"})

  // }
  // const user=  Users.findOne({email})
  
  // Users.findOne({email: req.body.email},(err,data)=>{
  //   if (err){ 
  //       return res.status(500).send({ message: err });
  //   }
  //   console.log(data)
  //   if(data!==null){
      // users.comparePassword(req.body.password);
      // var candidatePassword=req.body.password
      // UserSchema.methods.comparePassword=function(candidatePassword){
        // const users=this;
        // console.log(users.password)
        // console.log(users.email)
        // console.log(candidatePassword)
        // return new Promise((resolve,reject)=>{
        //     bcrypt.compare(candidatePassword,users.password,(err,isMatch)=>{
        //         if(err){
        //             return reject(err)
        //         }
        //         if(!isMatch){
        //             return console.log("not match")
        //         }
        //         resolve(true)
        //     })
        // })
        // }
//       return res.status(201).send({message:"success",data: data})
//     }
//     else{
//       return res.status(404).send({ message: "Not Found" });
//     }
// })
  // if(!user){
  //   return res.status(400).send({message : "Bad Request"})

  // }
  // try{
  //  await   user.comparePassword(password);
  //   return res.status(201).send({message:"success",data: data})

  // }catch(err){
  //   return res.status(422).send({ message: "Not Found" });
  // }
// user.findUserByCredentials(email,password);

//request user krta hy,response server kry ga.


exports.create = (req,res)=>{
    
    if (!req.body){
        return res.status(400).send({message : "Bad Request"})

    }
    let welfare = new Welfares(req.body)
    welfare.save((err,data)=>{
        if (err){ 
            // const errors=handleErrors(err)
            // return res.status(400).send({errors})
            const error="email already taken"
            return res.status(500).send({message : "this email is already taken"})
        }

        return res.status(201).send({message:"success"})
    })
}

exports.email = (req,res)=>{
    console.log(req.param)
    Welfares.find({email : req.params.email}).count()
        .exec((err, data) => {
          if (err){ 
            return res.status(500).send({ message: err });
          }
          return res.status(201).send({message:"success",data:data})
        })
    }



//request user krta hy,response server kry ga.

// exports.getall = (req,res)=>{
//   console.log(req.params)
//   AdPost.find({}).populate(["carpooler","destination","start","stop1","stop2"])
//   .exec((err, data) => {
//     if (err){ 
//       return res.status(500).send({ message: err });
//     }
//     return res.status(201).send({message:"success",data:data})
//   })


// }
// //
// exports.update = (req,res)=>{
//     Carpoolers.updateOne({_id: req.params.id} , { $set : req.body},  {upsert: true }, (err, data)=>{
//         if(err)
//           return res.status(500).send({ message: err });
//         return res.status(200).send({message:"success"})
//       })
// }


// exports.delete = (req,res)=>{
//     Carpoolers.deleteOne({_id : req.params.id} , (err,data)=>{
//         if(err)
//           return res.status(500).send({ message: err });
    
//         return res.status(200).send({message:"success"})
//       })
// }