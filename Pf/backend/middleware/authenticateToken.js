const jwt = require('jsonwebtoken');

// Vérifier que JWT_SECRET est défini
if (!process.env.JWT_SECRET) {
  console.error('❌ FATAL: JWT_SECRET is not defined in .env file!');
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware d'authentification JWT
 * Vérifie le token dans le header Authorization
 */
const authenticateToken = (req, res, next) => {
  // Récupérer le header Authorization
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  // Extraire le token (format: "Bearer <token>")
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token format. Use: Bearer <token>'
    });
  }

  const token = parts[1];

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attacher les informations de l'utilisateur à la requête
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    
    next();
    
  } catch (error) {
    console.error('❌ Token verification error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
        code: 'INVALID_TOKEN'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Token verification failed.',
      code: 'TOKEN_ERROR'
    });
  }
};

/**
 * Middleware optionnel - n'échoue pas si pas de token
 * Utile pour les routes qui peuvent être accessibles avec ou sans auth
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return next();
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next();
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
  } catch (error) {
    // Token invalide, mais on continue quand même
    console.warn('⚠️ Optional auth: Invalid token provided');
  }
  
  next();
};

module.exports = {
  authenticateToken,
  optionalAuth
};