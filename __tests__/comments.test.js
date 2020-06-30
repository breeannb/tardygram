const { agent, getLoggedInUser, prepare } = require('../database/data-helpers');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

describe('comments routes', () => {
  it('creates a comment with POST', async() => {
    const loggedInUser = await getLoggedInUser();
    const createdPost = await Post.findOne({ user: loggedInUser._id });

    return agent
      .post('/api/v1/comments')
      .send({
        commentBy: loggedInUser._id,
        post: createdPost._id,
        comment: 'here is a comment for a post'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          commentBy: loggedInUser.id,
          post: createdPost.id,
          comment: 'here is a comment for a post'
        });
      });
  });
  it('deletes a comment by id', async() => {
    const loggedInUser = await getLoggedInUser();

    const post = prepare(await Post.create({ 
      user: loggedInUser._id, 
      photoUrl: 'whatever@url.com',
      caption: 'this is a caption',
      tags: ['string one', 'string 2', 'rad'] }));

    const comment = prepare(await Comment.create({ commentBy: loggedInUser._id, post: post._id, comment: 'here is a comment' }));

    return agent
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});
