import models from '../models'

export default async (req, res) => {
  const director = await models.Directors.findAll({
    include: [
      {
        model: models.Movies,
        include: {
          model: models.Genres,
        },
      },
    ],
    where: { id: req.params.id },
  })

  return director ? res.status(200).send(director) : res.sendStatus(404)
}
