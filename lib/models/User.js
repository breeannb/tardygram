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

userSchema.statics.authorize = function(username, password) {
  return this.findOne({ username })
    .then(user => {
      if(!user){
        throw new Error('Invalid Username/Password'); 
      }

      if(!bcrypt.compareSync(password, user.passwordHash)) {
        throw new Error('Invalid Username/Password');
      }

      return user; 
    });
};

userSchema.statics.verifyToken = function(token) {
  const { sub } = jwt.verify(token, process.env.APP_SECRET || 'secret'); 
  return this.hydrate(sub); 
};

userSchema.methods.authToken = function() {
  return jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET || 'secret', {
    expiresIn: '24h'
  });
};

module.exports = mongoose.model('User', userSchema); 
