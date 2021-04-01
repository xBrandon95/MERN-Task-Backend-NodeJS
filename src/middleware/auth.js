const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Read token of header
  const token = req.header('x-auth-token');

  // Check token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no valido ' });
  }

  // Validate token
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    req.user = cifrado.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no valido' });
  }
};
