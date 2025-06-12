export default (req, res, next) => {
  const apiKey = req.header('api-key');
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}