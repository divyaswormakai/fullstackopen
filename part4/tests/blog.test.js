const dummy = require('../utils/list_helper');
const list_helper = require('../utils/list_helper');

describe('dummy run', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = list_helper.dummy(blogs);
    expect(result).toBe(1);
  });
});
