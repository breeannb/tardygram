require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true, 
    unique: true
  }, 
  passwordHash: {
    type: String, 
    required: true
  }, 
  profilePhotoUrl: {
    type: String
  }

}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
}); 

userSchema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS || 2);
});

userSchema.statics.authorize = function(email, password) {
  return this.findOne({ email })
    .then(user => {
      if(!user){
        throw new Error('Invalid Email/Password'); 
      }

      if(!bcrypt.compareSync(password, user.passwordHash)) {
        throw new Error('Invalid Email/Password');
      }

      return user; 
    });
};

userSchema.statics.verifyToken = function(token) {
  const { sub } = jwt.verify(token, process.env.APP_SECRET); 
  return this.hydrate(sub); 
};

userSchema.methods.authToken = function() {
  return jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
};

module.exports = mongoose.model('User', userSchema); 
