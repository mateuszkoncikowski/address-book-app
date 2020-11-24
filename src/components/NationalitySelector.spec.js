import * as React from 'react';
import { render, cleanup, screen, fireEvent } from '../test/test-utils';
import NationalitySelector from './NationalitySelector';

afterEach(() => cleanup());

it('should display NationalitySelector', () => {
  render(<NationalitySelector />);

  expect(
    screen.getByRole('heading', { name: /set nationalities/i })
  ).toBeVisible();
  expect(screen.getByRole('button', { name: /es/i })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
});

it('should have proper buttons attribute after click', () => {
  render(<NationalitySelector />);

  fireEvent.click(screen.getByRole('button', { name: /gb/i }));

  expect(screen.getByRole('button', { name: /es/i })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(screen.getByRole('button', { name: /gb/i })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(screen.getByRole('button', { name: /fr/i })).toHaveAttribute(
    'aria-pressed',
    'false'
  );
  expect(screen.getByRole('button', { name: /ch/i })).toHaveAttribute(
    'aria-pressed',
    'false'
  );

  fireEvent.click(screen.getByRole('button', { name: /es/i }));

  expect(screen.getByRole('button', { name: /es/i })).toHaveAttribute(
    'aria-pressed',
    'false'
  );
});

it('should have proper button attribute after clicking on already pressed button', function () {
  render(<NationalitySelector />);

  expect(screen.getByRole('button', { name: /gb/i })).toHaveAttribute(
    'aria-pressed',
    'true'
  );

  fireEvent.click(screen.getByRole('button', { name: /gb/i }));

  expect(screen.getByRole('button', { name: /gb/i })).toHaveAttribute(
    'aria-pressed',
    'false'
  );
});
