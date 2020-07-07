module.exports = (Sequelize, sequelize) => {
  const labs = sequelize.define("Laboratory", {
    id: {
      type         : Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey   : true,
      allowNull    : false
    },
    number: {
      type     : Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type     : Sequelize.TEXT,
      allowNull: true
    },
    points: {
      type     : Sequelize.INTEGER,
      allowNull: true
    },
    max_points: {
      type     : Sequelize.INTEGER,
      allowNull: true
    },
    date: {
      type     : Sequelize.TEXT,
      allowNull: true
    }
  },{
    timestamps: false
  })

  return labs
}