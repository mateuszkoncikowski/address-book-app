import * as React from 'react';
import { render, screen } from '../test/test-utils';
import Loading from './Loading';

it('should display Loading', () => {
  render(<Loading />);

  expect(screen.getByRole('progressbar')).toBeVisible();
});
