const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const MINIMUM = 1;
  const MAXIMUM = 5;
    
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo \"rate\" é obrigatório' }); 
  }

  if (!Number.isInteger(rate) || rate < MINIMUM || rate > MAXIMUM) {
    return res.status(400).json({ message: 'O campo \"rate\" deve ser um número inteiro entre 1 e 5' }); 
  }

  return next();
};

module.exports = validateRate;