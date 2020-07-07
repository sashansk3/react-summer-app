module.exports = (Sequelize, sequelize) => {
  const subjects = sequelize.define("subjects", {
    id: {
      type         : Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey   : true,
      allowNull    : false
    },
    name: {
      type     : Sequelize.TEXT,
      allowNull: false
    },
    teachers: {
      type     : Sequelize.TEXT,
      allowNull: true,
      get: function() {
        return JSON.parse(this.getDataValue('teachers'));
      }, 
      set: function(val) {
        return this.setDataValue('teachers', JSON.stringify(val));
      }
    },
    week: {
      type     : Sequelize.TEXT,
      allowNull: true
    },
    labs: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type     : Sequelize.TEXT,
      allowNull: true
    },
  },{
    timestamps: false
  })

  return subjects
}