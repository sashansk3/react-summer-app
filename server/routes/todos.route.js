module.exports = app => {
  const 
    todos = require("../contollers/todos.contoller"),
    router = require("express").Router();
    
  router
    .get("/", todos.getAll)
    .post("/", todos.create)
    .put("/:id", todos.update)
    .delete("/:id", todos.delete)

  app.use("/todos", router)
}