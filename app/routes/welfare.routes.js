

const controller = require("../controller/welfare.controller")
module.exports=function(app){
    app.post("/api/welfare/signin",controller.signin)
    app.post("/api/welfare/create",controller.create)
    // app.get("/api/user/email/:email",controller.email)

    // app.get("/api/carpooler/getall/:id",controller.getall)
    // app.put("/api/carpooler/update/:id",controller.update)
    // app.delete("/api/carpooler/delete/:id",controller.delete)
}