export default (err, req, res, next) => {
  console.error('🔥 Erreur:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur'
  });
};
