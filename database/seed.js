const chance = require('chance').Chance();

const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

module.exports = async({ users = 10, posts = 20, comments = 50 } = {}) => {
  const createdUsers =
  await User.create([...Array(users)].map((_, i) => ({
    username: `testusername${i}`,
    password: 'password1234',
    profilePhotoUrl: chance.url()
  })));
  const createdPosts =
   await Post.create([...Array(posts)].map(() => ({
     user: chance.pickone(createdUsers)._id,
     photoUrl: chance.url(),
     caption: chance.sentence(),
     tags: [chance.word(), chance.profession()]
   })));

  await Comment.create([...Array(comments)].map((id) => ({
    commentBy: chance.pickone(createdUsers)._id,
    post: chance.pickone(createdPosts)._id,
    comment: chance.sentence()
  })));
};
