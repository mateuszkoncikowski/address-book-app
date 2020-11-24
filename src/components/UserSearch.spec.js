import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import UserSearch from './UserSearch';

it('should set value to input', async () => {
  const setSearchFn = jest.fn();
  const searchedValue = 'Random name';
  render(<UserSearch searchValue="init" setSearchValue={setSearchFn} />);
  const searchInput = screen.getByPlaceholderText(/search…/i);

  fireEvent.change(searchInput, {
    target: { value: searchedValue },
  });

  await waitFor(() =>
    expect(searchInput).toHaveAttribute('value', searchedValue)
  );
});
