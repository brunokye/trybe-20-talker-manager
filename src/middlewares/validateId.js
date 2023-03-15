const getTalkers = require('../utils/getTalkers');

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await getTalkers.getAll();
  const talker = talkers.some((t) => t.id === Number(id));

  if (!talker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada'});
  }

  return next();
}

module.exports = validateId;