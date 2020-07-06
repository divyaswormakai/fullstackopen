const initialUsers = [
  { username: 'user1', name: 'Full Name', password: '1234' },
  { username: 'user2', name: 'Full Name', password: '1234' },
  { username: 'user3', name: 'Full Name', password: '1234' },
];

const toPostUser = {
  username: 'PostUser 1',
  name: 'Posted Data',
  password: '1234',
};

const invalidUsers = [
  { username: 'a', name: 'NAME', password: '1234' },
  { name: 'Name', password: '1234' },
  { username: 'user3', name: 'Full Name', password: '1234' },
  { username: 'user4', name: 'Full Name' },
];

module.exports = {
  initialUsers,
  toPostUser,
  invalidUsers,
};
