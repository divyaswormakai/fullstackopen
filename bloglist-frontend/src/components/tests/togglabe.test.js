import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Toggalable from '../Toggalable';

describe('Togglable testing', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Toggalable buttonLabel="show...">
        <div className="testDiv">
          <p>ASDFASDFA</p>
        </div>
      </Toggalable>
    );
  });

  test('render its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggalableContent');
    expect(div).toHaveStyle('display:none');
  });

  test('after clicking btn, children are showed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.toggalableContent');
    expect(div).not.toHaveStyle('display:none');
  });
});
