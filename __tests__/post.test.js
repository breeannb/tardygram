const request = require('supertest');
const app = require('../lib/app');
const { agent, getLoggedInUser, prepare } = require('../database/data-helpers');
const Post = require('../lib/models/Post');
// const User = require('../lib/models/User');

describe('post routes for post model', () => {

  it('creates a post', async() => {
    const loggedInUser = await getLoggedInUser();
    
    return agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'whatever@url.com',
        caption: 'this is a caption',
        tags: ['string one', 'string 2', 'rad']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          user: loggedInUser.id,
          photoUrl: 'whatever@url.com',
          caption: 'this is a caption',
          tags: ['string one', 'string 2', 'rad']
        });
      });
  });

});
