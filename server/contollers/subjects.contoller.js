const 
  model    = require('../models'),
  Subjects = model.subjects,
  Labs     = model.labs,
  Op       = model.Sequelize.Op;

exports.create = (req, res) => {
  const subject = req.body.subject

  Subjects
    .create(subject)
    .then(subject => {
      if(subject.labs != 0){
        let subjectId = subject.dataValues.id
        for(let i = 1; i <= subject.labs; i++){
          subject
            .createLaboratory({
              number : i,
              status : "false",
              userId: subject.userId,
              subjectId,
            })
            .catch(err => console.log(err))
        }
      }
      res.json(subject.dataValues)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}

exports.getAll = (req, res) => {
  let userId = req.query.userId

  Subjects
    .findAll({
      where: {userId},
      include: [{model: Labs}]
    })
    .then(subject => {
      res.json(subject)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

exports.update = (req, res) => {
  let 
    subject = req.body.subject,
    id      = subject.id;

  Subjects
    .update(subject, {
      where    : {id},
      returning: true
    })
    .then(subject => {
      res.json(subject)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}

exports.delete = (req, res) => {
  let id = req.params.id.slice(1);
  Subjects
    .destroy({
      where: {id}
    })
    .then(subject => {
      res.json(subject)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}