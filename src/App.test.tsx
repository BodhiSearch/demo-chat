import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('App', () => {
  test('renders the landing page', () => {
    render(<App />);

    // Verify "Vite + React" heading is present
    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument();
  });

  test('renders the root element', () => {
    const { container } = render(<App />);

    // Verify app rendered within container
    expect(container.firstChild).toBeInTheDocument();
  });
});
