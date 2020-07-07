module.exports = app => {
  const 
    labs = require("../contollers/labs.contoller"),
    router = require("express").Router();
    
  router
    .get("/", labs.getAll)
    // .post("/", labs.getAll)
    .put("/:id", labs.update)
    // .delete("/:id", labs.update)

  app.use("/labs", router)
}