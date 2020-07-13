import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlogForm from '../AddBlogForm';
import AddBlog from '../AddBlogForm';

test('Form working as desired or not', () => {
  const handleAddBlog = jest.fn();

  const component = render(<AddBlog handleAddBlog={handleAddBlog} />);

  //   cont;
});
