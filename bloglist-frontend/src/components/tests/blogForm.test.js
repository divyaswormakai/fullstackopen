import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlogForm from '../AddBlogForm';
import AddBlog from '../AddBlogForm';

test('Form working as desired or not', () => {
  const handleAddBlog = jest.fn();

  const component = render(<AddBlog handleAddBlog={handleAddBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('.add-blog-form');

  fireEvent.change(title, { target: { value: 'title controlled by me' } });
  fireEvent.change(author, { target: { value: 'author controlled by me' } });
  fireEvent.change(url, { target: { value: 'Url controlled by me' } });

  fireEvent.submit(form);

  expect(handleAddBlog.mock.calls).toHaveLength(1);
  console.log(handleAddBlog.mock.calls[0][0]);
  expect(handleAddBlog.mock.calls[0][0].title).toBe('title controlled by me');
  expect(handleAddBlog.mock.calls[0][0].author).toBe('author controlled by me');
  expect(handleAddBlog.mock.calls[0][0].url).toBe('Url controlled by me');
});
