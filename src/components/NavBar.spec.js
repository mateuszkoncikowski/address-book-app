import * as React from 'react';
import { render, screen, fireEvent } from '../test/test-utils';
import NavBar from './NavBar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import UserSearch from './UserSearch';

it('should display NavBar', () => {
  render(<NavBar />);

  expect(screen.getByText(/address book/i)).toBeVisible();
});

it('should display NavBar with Icon', () => {
  const iconCallbackFn = jest.fn();

  render(
    <NavBar
      navigationIcon={
        <IconButton
          onClick={iconCallbackFn}
          color="inherit"
          data-cy="home-link"
        >
          <HomeIcon />
        </IconButton>
      }
    />
  );

  fireEvent.click(screen.getByRole('button'));
  expect(iconCallbackFn).toBeCalledTimes(1);
});

it('should display NavBar with Search component', () => {
  render(<NavBar searchComponent={<UserSearch />} />);

  expect(screen.getByPlaceholderText(/search…/i)).toBeVisible();
});
