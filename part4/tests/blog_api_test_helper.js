const Blog = require('../models/blog.model');

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

module.exports = {
  dummyData,
  postData,
  likePostData,
};
