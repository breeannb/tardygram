
const request = require('supertest');
const app = require('../lib/app');
const { agent } = require('../database/data-helpers');

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

  it('can log in a user with POST', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'testusername0', 
        password: 'password1234',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          username: 'testusername0',
          profilePhotoUrl: expect.any(String)
        });
      });
  });

  it('can verify if a user is logged in and verified', () => {
    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          username: 'testusername0',
          profilePhotoUrl: expect.any(String)
        });
      });
  });

});
