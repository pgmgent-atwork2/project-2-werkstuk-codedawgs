export default (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).send('Permission denied. Only admins can visit this page.');
};
