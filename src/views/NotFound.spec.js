import * as React from 'react';
import { render, screen } from '../test/test-utils';
import NotFound from './NotFound';

jest.mock('@reach/router');

it('should display NotFound view', () => {
  render(<NotFound />);

  expect(screen.getByRole('heading', { name: /ups, go back/i })).toBeVisible();
});
