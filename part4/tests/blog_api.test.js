const mongoose = require('mongoose');
const supertest = require('supertest');
const logger = require('../utils/logger');
const app = require('../app');
const Blog = require('../models/blog.model');
const helper = require('./blog_api_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let tempData = new Blog(helper.dummyData[0]);
  await tempData.save();
  let tempData2 = new Blog(helper.dummyData[1]);
  await tempData2.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('toJSON has changed _id to id', async () => {
  const response = await api.get('/api/blogs');
  //check if the property is defined
  expect(response.body[0].id).toBeDefined();
});

describe('all about post method', () => {
  test('POST method working', async () => {
    const postedData = await api
      .post('/api/blogs')
      .send(helper.postData)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    delete postedData.body.id;

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.dummyData.length + 1);
    expect(postedData.body).toEqual(helper.postData);
  });

  test('Post method with likes set default to 0', async () => {
    const postedData = await api
      .post('/api/blogs')
      .send(helper.likePostData)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    let tempData = helper.likePostData;
    tempData.likes = 0;
    delete postedData.body.id;
    expect(postedData.body).toEqual(tempData);
  });

  test('Post method for missing title', async () => {
    await api.post('/api/blogs').send(helper.noTitleData).expect(404);
  });

  test('Post method for missing url', async () => {
    await api.post('/api/blogs').send(helper.noUrlData).expect(404);
  });
});

test('title checking', async () => {
  const response = await api.get('/api/blogs');
  let titles = response.body.map((data) => data.title);
  //check if the property is defined
  expect(titles).toContain('Blog title 2');
});

afterAll(() => {
  mongoose.connection.close();
});
