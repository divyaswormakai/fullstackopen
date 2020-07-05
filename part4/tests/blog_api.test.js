const mongoose = require('mongoose');
const supertest = require('supertest');
const logger = require('../utils/logger');
const app = require('../app');
const Blog = require('../models/blog.model');
const { response } = require('express');
const { post } = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let tempData = new Blog(dummyData[0]);
  await tempData.save();
  let tempData2 = new Blog(dummyData[1]);
  await tempData2.save();

  logger.info('DATA hasbeen saved');
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
      .send(postData)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(dummyData.length + 1);
    expect(postData).toEqual(postData);
  });

  test('Post method with likes set default to 0', async () => {
    const postedData = await api
      .post('/api/blogs')
      .send(likePostData)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    let tempData = likePostData;
    tempData.likes = 0;
    delete postedData.body.id;
    console.log(postedData.body);
    expect(postedData.body).toEqual(tempData);
  });
});

const dummyData = [
  {
    title: 'Blog title 1',
    author: 'The original Makai',
    url: 'http://www.divyaswormakai.com.np',
    likes: 4,
  },
  {
    title: 'Blog title 2',
    author: 'The original Makai second',
    url: 'http://www.divyaswormakai.com.np',
    likes: 10,
  },
];

const postData = {
  title: 'Blog from post method',
  author: 'Poster',
  url: 'http://www.divyaswormakai.com.np',
  likes: 0,
};

const likePostData = {
  title: 'This has like field absent',
  author: 'Poster',
  url: 'http://www.divyaswormakai.com.np',
};

// test('length of blogs be 2', async () => {
//   const res = await api.get('/api/blogs');
//   expect(res.body).toHaveLength(dummyData.length);
// });

test('title checking', async () => {
  const response = await api.get('/api/blogs');
  let titles = response.body.map((data) => data.title);
  //check if the property is defined
  expect(titles).toContain('Blog title 2');
});

afterAll(() => {
  mongoose.connection.close();
});
