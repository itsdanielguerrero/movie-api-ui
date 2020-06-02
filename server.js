/* eslint-disable max-len */
import express from 'express'
import path from 'path'
import getDirectorById from './controllers/directors'
import getGenreById from './controllers/genres'
import {
  getAllMovies, getMovieById, postNewMovie, patchMovie, deleteMovieById,
} from './controllers/movies'


const app = express()
const PORT = process.env.PORT || 1338

app.use(express.json())

app.use(express.static('public'))

app.get('/movies', getAllMovies)
app.get('/movies/:id', getMovieById)
app.get('/directors/:id', getDirectorById)
app.get('/genre/:id', getGenreById)
app.post('/movies', postNewMovie)
app.patch('/movies', patchMovie)
app.delete('/movies/:id', deleteMovieById)


app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up and running!')
})
