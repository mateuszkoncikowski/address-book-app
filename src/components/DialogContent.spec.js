import * as React from 'react';
import { render, screen } from '../test/test-utils';
import DialogContent from './DialogContent';

it('should display DialogContent', () => {
  const content = 'content';
  render(<DialogContent>{content}</DialogContent>);

  expect(screen.getByText(content)).toBeVisible();
});
