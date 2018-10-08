module.exports = (req, res, next) => {
  if (req.user.isAdmin) next();
  return res.status(403).send();
};
