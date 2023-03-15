const validateWactchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  
  if (watchedAt === undefined) {
    return res.status(400).json({ message: 'O campo \"watchedAt\" é obrigatório' }); 
  }

  if (!date.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"' }); 
  }
    
  return next();
};

module.exports = validateWactchedAt;