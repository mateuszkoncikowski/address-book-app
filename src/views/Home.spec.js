import * as React from 'react';
import { render, screen, waitForElementToBeRemoved } from '../test/test-utils';
import Home from './Home';

jest.mock('@reach/router');

it('should display Home view', async () => {
  render(<Home />);

  expect(screen.getByRole('button')).toBeVisible();

  // Suspense loader
  expect(screen.getByRole('progressbar')).toBeVisible();
  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

  // UserList loader
  expect(screen.getByText(/loading .../i)).toBeVisible();
});
