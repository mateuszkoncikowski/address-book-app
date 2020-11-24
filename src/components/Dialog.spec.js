import * as React from 'react';
import { render, screen } from '../test/test-utils';
import Dialog from './Dialog';

it('should display Dialog with parameter open set to true', () => {
  const content = 'content';
  render(<Dialog open={true}>{content}</Dialog>);

  expect(screen.getByText(content)).toBeVisible();
});

it('should not render Dialog with parameter open set to false', () => {
  const content = 'content';
  render(<Dialog open={false}>{content}</Dialog>);

  expect(screen.queryByText(content)).not.toBeInTheDocument();
});
