const express = require('express');
const getTalkers = require('../utils/getTalkers');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers.getAll();
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkers.getById(Number(id));

  if (talker) {
    return res.status(200).json(talker);
  } else {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;