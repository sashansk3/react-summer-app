module.exports = (Sequelize, sequelize) => {
  const users = sequelize.define("users", {
    id: {
      type         : Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey   : true,
      allowNull    : false
    },
    login: {
      type     : Sequelize.TEXT,
      allowNull: false
    },
    password: {
      type     : Sequelize.TEXT,
      allowNull: false
    }
  },{
    timestamps: false
  })

  return users
}