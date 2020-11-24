import * as React from 'react';
import { render, screen, fireEvent, user } from '../test/test-utils';
import UserListItem from './UserListItem';

const index = 0;

it('should display UserListItem', () => {
  render(
    <UserListItem user={user} index={index} onClick={() => {}} style={{}} />
  );

  expect(screen.getByText(user.email)).toBeVisible();
  expect(screen.getByText('1. BigJohn98 - John Doe')).toBeVisible();
  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    user.picture.thumbnail
  );
});

it('UserListItem should trigger callback after clicking', () => {
  const onClickCallback = jest.fn();
  render(
    <UserListItem user={user} index={0} onClick={onClickCallback} style={{}} />
  );

  fireEvent.click(screen.getByRole('listitem'));

  expect(onClickCallback).toHaveBeenCalledTimes(1);
});
