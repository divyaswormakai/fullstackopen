import React from 'react';
import '@testing-library/jest-dom/extend-expect';
<<<<<<< HEAD
import { render, fireEvent } from '@testing-library/react';
import Blog from '../Blog';
import { prettyDOM } from '@testing-library/dom';

//prettyDOM for searching specidif dom
=======
import { render } from '@testing-library/react';
import Blog from '../Blog';

>>>>>>> 76fee3fb094422f9d68f9fe9c816de69558d767b
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

<<<<<<< HEAD
  const p = component.container.querySelector('p');
  console.log(prettyDOM(p));

  const detailsDiv = component.container.querySelector('.expanded-blog');
  expect(detailsDiv).toHaveStyle('display:none');
});

//for clicking of the expand button
test('clicking the show more button', () => {
  const blog = {
    title: 'Test',
    author: 'author',
    url: 'asdfasdf',
    likes: 0,
  };
  const increaseLike = jest.fn();
  const deleteBlog = jest.fn();

  const component = render(
    <Blog blog={blog} increaseLike={increaseLike} deleteBlog={deleteBlog} />
  );

  //get the showDetails btn and then click the button
  const showDetails = component.container.querySelector('.show-details-btn');
  console.log(prettyDOM(showDetails));
  fireEvent.click(showDetails);

  //check if the display is none
  const detailsDiv = component.container.querySelector('.expanded-blog');
  expect(detailsDiv).not.toHaveStyle('display:none');

  //check if the like button is called twice
  const likeBtn = component.container.querySelector('.increase-like-btn');
  fireEvent.click(likeBtn);
  fireEvent.click(likeBtn);
  expect(increaseLike.mock.calls).toHaveLength(2);
=======
  const urlDiv = component.container.querySelector('blog-url');
  expect(urlDiv).toBeNull();

  const likeDiv = component.container.querySelector('blog-likes');
  expect(likeDiv).toBeNull();
>>>>>>> 76fee3fb094422f9d68f9fe9c816de69558d767b
});
