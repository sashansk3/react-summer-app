const 
  model = require('../models'),
  Labs = model.labs,
  Op    = model.Sequelize.Op;

exports.getAll = (req, res) => {
  let userId = req.query.userId
  Labs
    .findAll({
      where:{userId}
    })
    .then(labs => {
      res.json(labs)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

exports.update = (req, res) => {
  let 
    lab = req.body.lab,
    id = req.params.id.slice(1);

  console.log(lab)
  Labs
    .update(lab, {
      where: {id}
    })
    .then(lab => {
      res.json(lab)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}