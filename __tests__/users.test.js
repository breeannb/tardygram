const { agent, prepare } = require('../database/data-helpers');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

describe('user routes', () => {

  it('retrieves the 10 most prolific users with GET', async() => {
    const users = prepare(await User.prolific());

    return agent
      .get('/api/v1/users/prolific')
      .then(res => {
        expect(res.body).toEqual(users);
      });
  });
});
