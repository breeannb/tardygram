const User = require('../models/User'); 

module.exports = (req, res, next) => {
  req.user = User.verifyToken(req.cookies.session); 
  next();
};
