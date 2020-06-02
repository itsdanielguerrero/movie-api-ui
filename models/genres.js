
export default (sequelize, Sequelize) => sequelize.define('genres', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  genre: { type: Sequelize.STRING },
})
