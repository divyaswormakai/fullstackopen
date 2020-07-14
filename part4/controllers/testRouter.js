const testRouter = require('express').Router();
const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const logger = require('../utils/logger');

testRouter.post('/reset', async (req, res) => {
  try {
    //clear the database
    await Blog.deleteMany({});
    await User.deleteMany({});
    logger.info('Deleted everything');
    res.status(200).json({ message: 'reset everything' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = testRouter;
