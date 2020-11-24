import * as React from 'react';
import { render, screen, user, waitFor } from '../test/test-utils';
import UserInfoDialog from './UserInfoDialog';

it('should display nothing if user is not passed', () => {
  const { container } = render(
    <UserInfoDialog isOpen={true} handleClose={() => {}} />
  );

  expect(container.innerHTML).toBe('');
});

it('should display nothing if isOpen parameter is false', async () => {
  const { container } = render(
    <UserInfoDialog user={user} isOpen={false} handleClose={() => {}} />
  );

  expect(container.innerHTML).toBe('');
});

it('should display UserInfoDialog', async () => {
  render(<UserInfoDialog user={user} isOpen={true} handleClose={() => {}} />);

  await waitFor(() => expect(screen.getByRole('presentation')).toBeVisible());

  expect(
    screen.getByText(`User Info - ${user.name.first} ${user.name.last}`)
  ).toBeVisible();
  expect(screen.getByText(user.cell)).toBeVisible();
  expect(screen.getByText(user.phone)).toBeVisible();
  expect(screen.getByText(user.location.city)).toBeVisible();
  expect(screen.getByText(user.location.postcode)).toBeVisible();
  expect(screen.getByText(user.location.state)).toBeVisible();
  expect(
    screen.getByText(
      `${user.location.street.name} ${user.location.street.number}`
    )
  ).toBeVisible();
});
