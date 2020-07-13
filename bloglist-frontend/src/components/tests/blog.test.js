import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from '../Blog';

test('renders content', () => {
  const blog = {
    title: 'Test',
    author: 'author',
    url: 'asdfasdf',
    likes: 0,
  };

  const increaseLike = () => {
    blog.likes += 1;
  };

  const deleteBlog = () => {
    blog = {};
  };
  const component = render(
    <Blog blog={blog} increaseLike={increaseLike} deleteBlog={deleteBlog} />
  );

  expect(component.container).toHaveTextContent('Test');

  const urlDiv = component.container.querySelector('blog-url');
  expect(urlDiv).toBeNull();

  const likeDiv = component.container.querySelector('blog-likes');
  expect(likeDiv).toBeNull();
});
