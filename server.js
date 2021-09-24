const express = require("express")
const app = express()
const mongoose = require('mongoose');


const logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 2000;
require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));//jo bh api use ho rhi hoti hy to ye btata hy k hit hui ya nh.

require('./app/models/Calc.model');
const Calc = mongoose.model("Calc")

// const requireToken = require('./app/middleware/requireToken')
app.use(bodyParser.json())

const authRoutes = require('./app//routes/calcRoutes')
app.use(authRoutes)
const db = require("./app/models");

db.mongoose
    .connect(process.env.URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        // initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
app.get('/:id', (req, res) => {
    Calc.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
    // res.send("Gold="+req.calc.gold)
})
app.post('/history', (req, res) => {
    const calc = new Calc({
        gold: req.body.gold,
        silver: req.body.silver,
        cash_in_hand: req.body.cash_in_hand,
        cash_in_bank: req.body.cash_in_bank,
        loans: req.body.loans,
        property: req.body.property,
        business_assets: req.body.business_assets,
        currentDate: req.body.currentDate,
        user: req.body.token
    })
    calc.save()
    console.log(req.body)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/delete', (req, res) => {
    Calc.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/update', (req, res) => {
    Calc.findByIdAndUpdate(req.body.id, {
        gold: req.body.gold,
        silver: req.body.silver,
        cash_in_hand: req.body.cash_in_hand,
        cash_in_bank: req.body.cash_in_bank,
        loans: req.body.loans,
        property: req.body.property,
        business_assets: req.body.business_assets,
        total: req.body.total,
        zak: req.body.zak,

    }).then(data => {
        console.log(data)
        res.send(data)
    })
        .catch(err => {
            console.log(err)
        })
})


require("./app/routes/addtodo.routes")(app)

require("./app/routes/user.routes")(app)
require("./app/routes/welfare.routes")(app)
require("./app/routes/payment.routes")(app)

app.listen(2000, () => { console.log("serverlistening") })