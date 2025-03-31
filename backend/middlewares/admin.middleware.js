const authenticateAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'Admin privileges required' 
      });
    }
    next();
  };
  
  module.exports = { authenticateAdmin };
