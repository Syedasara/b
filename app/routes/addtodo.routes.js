const controller = require("../controller/addtodo.controller")
module.exports=function(app){
    app.post("/api/addtodo/create",controller.create)
    app.get("/api/addtodo/getall/:id",controller.getall)
    app.put("/api/addtodo/update/:id",controller.update)
    app.delete("/api/addtodo/delete/:id",controller.delete)
}