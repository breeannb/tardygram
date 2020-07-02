const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true,
    maxlength: 516,
  },
  tags: {
    type: [String],
    required: true,
  }

}, {
  toJSON: {
    virtual: true,
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});

postSchema.statics.popular = function() {
  return this.model('Comment').aggregate([
    {
      '$group': {
        '_id': '$post', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'count': -1
      }
    }, {
      '$limit': 10
    }
  ]);
};

module.exports = mongoose.model('Post', postSchema);
