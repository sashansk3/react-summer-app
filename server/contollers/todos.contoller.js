const 
  model = require('../models'),
  Todos = model.todos,
  Op    = model.Sequelize.Op;

exports.create = (req, res) => {
  const todo = req.body.todo
  todo.status = false

  Todos
    .create(todo)
    .then(todos => {
      res.json(todos.dataValues)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

exports.getAll = (req, res) => {
  let userId = req.query.userId
  Todos
    .findAll({
      where:{userId}
    })
    .then(todos => {
      let filteredTodosByDeadLine = todos.sort((a, b) => {
        if (a.deadline > b.deadline)
          return 1
        else if (a.deadline < b.deadline)
          return -1
        else
          return 0
      })
      res.json(filteredTodosByDeadLine)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

exports.update = (req, res) => {
  let 
    todo = req.body.todo,
    id = req.params.id.slice(1);

  Todos
    .update(todo, {
      where    : {id},
      returning: true,
    })
    .then(todos => {
      res.json(todos)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

exports.delete = (req, res) => {
  let id = req.params.id.slice(1);
  Todos
    .destroy({
      where: {id}
    })
    .then(todos => {
      res.json(todos)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}