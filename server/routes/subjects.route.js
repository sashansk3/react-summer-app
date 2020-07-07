module.exports = app => {
  const 
    subjects = require("../contollers/subjects.contoller"),
    router = require("express").Router();
    
  router
    .get("/", subjects.getAll)
    .post("/", subjects.create)
    .put("/", subjects.update)
    .delete("/:id", subjects.delete)

  app.use("/subjects", router)
}