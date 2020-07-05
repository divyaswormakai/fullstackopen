const blogRouter = require('express').Router();
const Blog = require('../models/blog.model');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog.toJSON());
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = blogRouter;
