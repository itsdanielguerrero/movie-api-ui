import models from '../models'

export const getAllMovies = async (req, res) => {
  const movies = await models.Movies.findAll({
    include: [
      {
        model: models.Directors,
      },
      {
        model: models.Genres,
      },
    ],
  })

  return res.status(200).send(movies)
}

export const getMovieById = async (req, res) => {
  const movie = await models.Movies.findOne({
    include: [
      {
        model: models.Directors,
      },
      {
        model: models.Genres,
      },
    ],
    where: { id: req.params.id },
  })

  return res.status(200).send(movie)
}


export const patchMovie = async (req, res) => res.sendStatus(204)

export const deleteMovieById = async (req, res) => {
  const { id } = req.params.id

  await models.MoviesDirectors.destroy({
    where: {
      movieId: id,
    },
  })

  await models.MoviesGenres.destroy({
    where: {
      movieId: id,
    },
  })

  await models.Movies.destroy({
    where: {
      id,
    },
  })

  return res.status(204).send(`Movie at is ${id} has been deleted succesfully!`)
}

const handleDirector = async (movieId, director) => {
  const isDirectorFound = await models.Directors.findOne({ where: { director } })
  if (isDirectorFound === null) {
    const newDirector = await models.Directors.create({ director })
    const directorId = newDirector.id
    await models.MoviesDirectors.create({ movieId, directorId })
    return newDirector
  }
  const directorId = isDirectorFound.id
  await models.MoviesDirectors.create({ movieId, directorId })
  return isDirectorFound
}

const handleGenre = async (movieId, genres) => {
  const isGenreFound = await models.Genres.findOne({ where: { genres } })
  if (isGenreFound === null) {
    const newGenre = await models.Genres.create({ genres })
    const genreId = newGenre.id
    await models.MoviesGenres.create({ movieId, genreId })
    return newGenre
  }
  const genreId = isGenreFound.id
  await models.MoviesGenres.create({ movieId, genreId })
  return isGenreFound
}

export const postNewMovie = async (req, res) => { // in progress
  const {
    title, directors, releaseDate, rating, runTime, genres,
  } = req.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    // eslint-disable-next-line max-len
    res.status(400).send('The following attributes are required: title, directors, releaseDate, rating, runTime, genres.')
  }
  const isMovieFound = await models.Movies.findOne({ where: { title, releaseDate } })

  // If movie is in the database already
  if (isMovieFound !== null) { return res.status(201).send('The Movie is already in the Database, Thank you!') }

  // If the movie is not in database the create
  const newMovie = await models.Movies.create({ title, releaseDate, rating, runTime })
  const movieId = newMovie.id

  const newDirector = await handleDirector(movieId, directors)
  const newGenre = await handleGenre(movieId, genres)

  return res.status(201).send({ movie: newMovie, director: newDirector, genre: newGenre })
}
