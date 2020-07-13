import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from '../Blog';
import { prettyDOM } from '@testing-library/dom';

//prettyDOM for searching specidif dom
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

  const p = component.container.querySelector('p');
  console.log(prettyDOM(p));

  const urlDiv = component.container.querySelector('.expanded-blog');
  expect(urlDiv).toHaveStyle('display:none');
});
