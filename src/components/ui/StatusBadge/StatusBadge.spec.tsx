import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge Component', () => {
  it('renders pending status with correct label and testid', () => {
    render(<StatusBadge status="pending" />);
    const badge = screen.getByTestId('badge-pending');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Pending');
  });

  it('renders approved status accurately', () => {
    render(<StatusBadge status="approved" />);
    const badge = screen.getByTestId('badge-approved');
    expect(badge).toHaveTextContent('Approved');
  });

  it('renders rejected status accurately', () => {
    render(<StatusBadge status="rejected" />);
    const badge = screen.getByTestId('badge-rejected');
    expect(badge).toHaveTextContent('Rejected');
  });

  it('falls back to pending for unknown status values', () => {
    render(<StatusBadge status={'unknown' as any} />);
    const badge = screen.getByTestId('badge-unknown');
    expect(badge).toHaveTextContent('Pending');
  });

  it('renders with the compact small styling', () => {
    render(<StatusBadge status="approved" size="small" />);
    const badge = screen.getByTestId('badge-approved');
    expect(badge).toHaveTextContent('Approved');
    expect(badge).toHaveStyle({ fontSize: '0.72rem' });
  });
});