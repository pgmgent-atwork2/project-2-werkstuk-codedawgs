export default (req, res, next) => {
  if (req.user && req.user.admin === 1) {
    return next();
  }
  return res.status(403).send("Permission denied, you're not an admin.");
};
