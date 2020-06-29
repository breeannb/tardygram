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

  it('gets all posts', async() => {
    
    const posts = prepare(await Post.find());
    
    return agent
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toEqual(posts);
      });
  });

  it('gets post by ID via GET', async() => {
    
    const post = prepare(await Post.findOne());
    
    return agent
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual(post);
      });
  });

  it('updates caption by ID via PATCH', async() => {
    const loggedInUser = await getLoggedInUser();
    const post = prepare(await Post.findOne({ user: loggedInUser._id }));
    
    return agent
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'new caption' })
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          caption:'new caption'
        });
      });
  });

});
