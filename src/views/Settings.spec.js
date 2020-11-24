import * as React from 'react';
import Settings from './Settings';
import { render, screen, waitFor } from '../test/test-utils';

jest.mock('@reach/router');

it('should display Settings view', async () => {
  render(<Settings />);

  expect(screen.getByRole('button')).toBeVisible();
  expect(screen.getByRole('progressbar')).toBeVisible();
  await waitFor(() =>
    screen.getByRole('heading', { name: /set nationalities/i })
  );
  expect(screen.getByRole('button', { name: /ch/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /es/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /fr/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /gb/i })).toBeVisible();
});
