import Sequelize from 'sequelize'
import allConfigs from '../config/sequelize'
import MovieModel from './movies'
import DirectorsModel from './directors'
import GenresModel from './genres'
import MoviesDirectorsModel from './moviesDirectors'
import MoviesGenresModel from './moviesGenres'

const config = allConfigs.development

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  define: {
    timestamps: false,
  },
})

const Movies = MovieModel(connection, Sequelize)
const Directors = DirectorsModel(connection, Sequelize)
const Genres = GenresModel(connection, Sequelize)
const MoviesDirectors = MoviesDirectorsModel(connection, Sequelize, Movies, Directors)
const MoviesGenres = MoviesGenresModel(connection, Sequelize, Movies, Genres)
const { Op } = Sequelize


Movies.belongsToMany(Directors, { through: MoviesDirectors })
Directors.belongsToMany(Movies, { through: MoviesDirectors })
Movies.belongsToMany(Genres, { through: MoviesGenres })
Genres.belongsToMany(Movies, { through: MoviesGenres })

export default {
  Movies,
  Directors,
  Genres,
  MoviesDirectors,
  MoviesGenres,
  Op,
}
