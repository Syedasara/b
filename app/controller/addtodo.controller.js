const { request } = require("express")
const db = require("../models")

const AddTodo = db.addtodo;

exports.create = (req,res)=>{
    if (!req.body){
        return res.status(400).send({message : "Bad Request"})

    }
    let addtodo = new AddTodo(req.body)
    addtodo.save((err,data)=>{
        if (err){ 
            return res.status(500).send({ message: err });
        }

        return res.status(201).send({message:"success"})
    })
}

exports.getall = (req,res)=>{
  console.log(req.params)
    AddTodo.find({user : req.params.id}).populate("user")
      .exec((err, data) => {
        if (err){ 
          return res.status(500).send({ message: err });
        }
        return res.status(201).send({message:"success",data:data})
      })
  }


  exports.delete = (req,res)=>{
    AddTodo.deleteOne({_id : req.params.id} , (err,data)=>{
        if(err)
          return res.status(500).send({ message: err });
    
        return res.status(200).send({message:"success"})
      })
}
exports.update = (req,res)=>{
  AddTodo.updateOne({_id: req.params.id} , { $set : {amount: req.body.amount }},  {upsert: true }, (err, data)=>{
        if(err)
          return res.status(500).send({ message: err });
        return res.status(200).send({message:"success"})
      })
}