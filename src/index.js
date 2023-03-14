const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoutes);

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const newToken = generateToken();
  res.status(200).json({ token: newToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
