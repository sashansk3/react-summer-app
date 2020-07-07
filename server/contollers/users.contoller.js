const 
  model = require('../models'),
  Users = model.users,
  Op    = model.Sequelize.Op;

exports.create = async(req, res) => {
  const user = req.body.user

  let isRegistered = await Users.count({where: {login: user.login}})
  if(isRegistered){
    res.send("User with login already exist")
    return
  }
  Users
    .create(user)
    .then(user => {
      res.json(user.dataValues)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

exports.auth = async(req, res) => {
  let user = req.body.user
  let isReal = await Users.count({where: {login: user.login}})
  if(!isReal){
    res.send("Invalid login")
    return
  }

  Users
    .findOne({
      where: {
        login   : user.login,
        password: user.password
      }
    })
    .then(user => {
      if(user.password != user.dataValues.password){
        res.send("Invalid password")
      }
      else{
        res.json(user.dataValues)
      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
}