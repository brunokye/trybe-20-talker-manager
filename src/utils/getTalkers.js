const fs = require('fs').promises;
const { join } = require('path');

const readTalkerData = async () => {
  const path = '../talker.json';

  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  const talkers = await readTalkerData();
  if (talkers === null) return [];
  return talkers;
};

const getById = async (id) => {
  const talker = await readTalkerData();
  return talker.find((person) => person.id === id);
};

module.exports = {
  getAll,
  getById,
}