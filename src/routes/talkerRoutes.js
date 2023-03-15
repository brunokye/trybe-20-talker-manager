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
const validateId = require('../middlewares/validateId');

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

    const allTalkers = JSON.stringify([...talkers, newTalker], null, 2)
    await fs.writeFile(talkersPath, allTalkers);

    res.status(201).json({ ...newTalker });
});

router.put('/:id',   
  validateToken, validateName, 
  validateAge, validateTalk, 
  validateWatchedAt, validateRate,
  validateId,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const talkers = await getTalkers.getAll();
    const index = talkers.findIndex((element) => element.id === Number(id));

    talkers[index] = { id: Number(id), name, age, talk };

    const updatedTalkers = JSON.stringify(talkers, null, 2);
    await fs.writeFile(talkersPath, updatedTalkers);

    res.status(200).json(talkers[index]);
});

router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;

    const talkers = await getTalkers.getAll();
    const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
    const updatedTalkers = JSON.stringify(filteredTalkers, null, 2);

    await fs.writeFile(talkersPath, updatedTalkers);

    res.status(204).json([]);
});

module.exports = router;