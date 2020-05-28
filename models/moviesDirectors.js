
export default (sequelize, Sequelize, Movies, Directors) => sequelize.define('moviesDirectors', {
  movieId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: Movies, key: Movies.id } },
  directorId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: Directors, key: Directors.id } },
})
