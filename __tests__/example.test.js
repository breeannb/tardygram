const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

<<<<<<< HEAD:__tests__/example.test
// const request = require('supertest');
// const app = require('../lib/app');
=======
>>>>>>> 254ebccb8bc8ae7fcc036486ea0d4d5a2fb742b9:__tests__/example.test.js

describe('tardygram routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('will pass the test', () => {
    
  });
});
