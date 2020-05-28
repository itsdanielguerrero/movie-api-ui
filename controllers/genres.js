import models from '../models'

export default async (req, res) => {
  const genre = await models.Genres.findAll({
    include: [
      {
        model: models.Movies,
        include: {
          model: models.Directors,
        },
      },
    ],
    where: { id: req.params.id },
  })

  return genre ? res.status(200).send(genre) : res.sendStatus(404)
}
