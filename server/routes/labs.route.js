module.exports = app => {
  const 
    labs = require("../contollers/labs.contoller"),
    router = require("express").Router();
    
  router
    .get("/", labs.getAll)
    .post("/", labs.create)
    .put("/:id", labs.update)
    .delete("/:id", labs.delete)

  app.use("/labs", router)
}