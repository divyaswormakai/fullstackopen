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

const noTitleData = {
  author: 'Poster with no title',
  url: 'http://www.divyaswormakai.com.np',
};

const noUrlData = {
  title: 'No url data',
  author: 'Poster',
};

const updateBlog = {
  title: 'Blog that will beupdated',
  author: 'Updater',
  url: 'http://www.divyaswormakai.com.np',
  likes: 6699,
};

module.exports = {
  dummyData,
  postData,
  likePostData,
  noTitleData,
  noUrlData,
  updateBlog,
};
