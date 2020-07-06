const userRouter = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json(users.map((user) => user.toJSON()));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const newUser = new User({
      username: body.username,
      name: body.name,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = userRouter;
