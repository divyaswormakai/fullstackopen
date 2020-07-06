const mongoose = require('mongoose');
const supertest = require('supertest');
const logger = require('../utils/logger');
const app = require('../app');
const User = require('../models/user.model');
const helper = require('./user_api_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  let temp = new User(helper.initialUsers[0]);
  await temp.save();

  let temp2 = new User(helper.initialUsers[1]);
  await temp2.save();

  let temp3 = new User(helper.initialUsers[2]);
  await temp3.save();
});

describe('Get Methods', () => {
  test('Getting all user data', async () => {
    const req = await api
      .get('/api/users')
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(req.body).toHaveLength(helper.initialUsers.length);
  });
});

describe('Post Methods', () => {
  test('Posting a new user', async () => {
    console.log(helper.toPostUser);
    const req = await api
      .post('/api/users')
      .send(helper.toPostUser)
      .expect(201);

    expect(req.body.username).toBe(helper.toPostUser.username);
  });

  test('Username of length 1', async () => {
    await api.post('/api/users').send(helper.invalidUsers[0]).expect(400);
  });

  test('Username absent', async () => {
    await api.post('/api/users').send(helper.invalidUsers[1]).expect(400);
  });

  test('Username already used', async () => {
    await api.post('/api/users').send(helper.invalidUsers[2]).expect(400);
  });

  test('Password absent', async () => {
    await api.post('/api/users').send(helper.invalidUsers[3]).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
