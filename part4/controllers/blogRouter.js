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

blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const blog = await Blog.findById(id);
    res.status(201).json(blog);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

blogRouter.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(201).json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

blogRouter.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const body = req.body;
    const id = req.params.id;
    const newBlog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
    });
    delete newBlog._id;
    newBlog._id = id;

    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
    });

    res.status(201).json(updatedBlog.toJSON());
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = blogRouter;
