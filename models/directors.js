
export default (sequelize, Sequelize) => sequelize.define('directors', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  director: { type: Sequelize.STRING },
})
