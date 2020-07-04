const mongoose = require('mongoose');
const supertest = require('supertest');
const logger = require('../utils/logger');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// test('length of blogs be 2', async () => {
//   const res = await api.get('/api/blogs');
//   expect(res.body).toHaveLength(2);
// });

// test('the first blogs says Blog title 1', async () => {
//   const response = await api.get('/api/blogs');

//   expect(response.body[0].title).toBe('Blog title 1');
// });

test('toJSON has changed _id to id', async () => {
  const response = await api.get('/api/blogs');
  //check if the property is defined
  expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
