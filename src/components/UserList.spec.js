import * as React from 'react';
import { render, screen, waitForElementToBeRemoved } from '../test/test-utils';
import UserList from './UserList';

it('should display UserList', async () => {
  render(<UserList />);

  expect(screen.getByText(/loading/i)).toBeVisible();

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
});
