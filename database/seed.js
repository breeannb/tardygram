const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ users = 10 } = {}) => {
  // const createdUsers = 
  await User.create([...Array(users)].map((_, i) => ({
    username: `testusername${i}`, 
    password: 'password1234',
    profilePhotoUrl: chance.url()
  })));
};
