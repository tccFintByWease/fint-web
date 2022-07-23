import { render, screen } from '@testing-library/react';
import App from './app';

test('renders text', () => {
  render(<App />);
  const text = screen.getByText(/landpage/i);
  expect(text).toBeInTheDocument();
});