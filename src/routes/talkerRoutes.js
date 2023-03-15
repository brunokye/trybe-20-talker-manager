const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const getTalkers = require('../utils/getTalkers');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const router = express.Router();
const talkersPath = path.resolve(__dirname, '../talker.json');

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

router.post('/', 
  validateToken, validateName, validateAge, 
  validateTalk, validateWatchedAt, validateRate,
  async (req, res) => {
    const talkers = await getTalkers.getAll();
    
    const newTalker = {
      id: talkers[talkers.length - 1].id + 1,
      ...req.body
    };

    const allTalkers = JSON.stringify([...talkers, newTalker])
    await fs.writeFile(talkersPath, allTalkers);

    res.status(201).json({ ...newTalker });
});

module.exports = router;