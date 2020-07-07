module.exports = app => {
  const 
    users = require("../contollers/users.contoller"),
    router = require("express").Router();

  router
    .post("/auth", users.auth)
    .post("/reg", users.create)

  app.use("/users", router)
}