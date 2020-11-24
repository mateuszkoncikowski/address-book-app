import * as React from 'react';
import { render, screen, fireEvent } from '../test/test-utils';
import DialogTitle from './DialogTitle';

it('should display DialogTitle', () => {
  const title = 'Normal title';
  render(<DialogTitle>{title}</DialogTitle>);

  expect(screen.getByRole('heading')).toHaveTextContent(title);
});

it('should trigger callback function when clicking on close button', () => {
  const title = 'Normal title';
  const closeCallback = jest.fn();
  render(<DialogTitle onClose={closeCallback}>{title}</DialogTitle>);

  fireEvent.click(screen.getByRole('button'));

  expect(closeCallback).toBeCalledTimes(1);
});
