// const { agent } = 
require('../database/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a new user with POST', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'testusername0', 
        password: 'password1234',
        profilePhotoUrl: 'imageone.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          username: 'testusername0',
          profilePhotoUrl: 'imageone.jpg'
        });
      });
  });

});
