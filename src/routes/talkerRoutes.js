const express = require('express');
const getTalkers = require('../utils/getTalkers');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const talkers = await getTalkers.getAllTalkers();
    res.status(200).json(talkers);
  } catch (err) {
    res.status(200).json([]);
  }
});

module.exports = router;