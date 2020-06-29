require('dotenv').config();
const User = require('../lib/models/User'); 

describe('user routes', () => {

  it('sets a password hash', () => {

    const user = new User({
      username: 'testusername', 
      password: 'password1234',
      profilePhotoUrl: 'imageone.jpg'
    });
    expect(user.passwordHash).toEqual(expect.any(String));
  });

  it('has an authToken method', () => {
    const user = new User({
      username: 'testusername', 
      password: 'password1234',
      profilePhotoUrl: 'imageone.jpg'
    });
    expect(user.authToken()).toEqual(expect.any(String));
  });

  it('can verify a token and return a user', () => {
    const user = new User({
      username: 'testusername', 
      password: 'password1234',
      profilePhotoUrl: 'imageone.jpg'
    });

    const token = user.authToken(); 
    const verifiedUser = User.verifyToken(token); 
    expect(verifiedUser.toJSON()).toEqual(user.toJSON());
  });

});
