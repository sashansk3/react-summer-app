const 
  dbConfig  = require("../config/db.conf"),
  Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host   : dbConfig.host,
  dialect: dbConfig.dialect,
  pool   : dbConfig.pool,
})

const db = {
  Sequelize,
  sequelize,
}

db.labs     = require("./labs.model")(Sequelize, sequelize)
db.subjects = require("./subjects.model")(Sequelize, sequelize)
db.todos    = require("./todos.model")(Sequelize, sequelize)
db.users    = require("./users.model")(Sequelize, sequelize)

db.users.hasMany(db.todos, { onDelete: "cascade" })
db.users.hasMany(db.subjects, { onDelete: "cascade" })
db.users.hasMany(db.labs, { onDelete: "cascade" })
db.subjects.hasMany(db.labs, { onDelete: "cascade" })

db.sequelize.sync()
// db.sequelize.sync({force: 1})

module.exports = db