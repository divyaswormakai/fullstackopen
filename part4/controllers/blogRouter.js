const blogRouter = require('express').Router();
const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

//get json web token
const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (req, res) => {
  const body = req.body;

  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing/invalid' });
    }

    const user = await User.findById(decodedToken.id);
    console.log(user);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    //saving the new blog
    const savedBlog = await blog.save();

    //adding blog to the user
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
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
