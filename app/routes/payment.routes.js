

const controller = require("../controller/payment.controller")
module.exports=function(app){
    app.post("/api/payment/create",controller.create)
    // app.post("/api//create",controller.create)
    // app.get("/api/user/email/:email",controller.email)

    app.get("/api/payment/getall",controller.getall)
    // app.put("/api/carpooler/update/:id",controller.update)
    // app.delete("/api/carpooler/delete/:id",controller.delete)
}