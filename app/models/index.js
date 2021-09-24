const express = require('express')
const bodyParser = require('body-parser')



const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.addtodo = require("./addtodo.model")

db.Users=require("./users.models")

db.Welfares=require("./welfares.models")
db.Payments=require("./payment.models")
module.exports = db;