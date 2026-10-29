import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title and description text', () => {
    render(
      <EmptyState
        icon="calendar-outline"
        title="No requests yet"
        description="You have not submitted any time off requests."
      />,
    );

    expect(document.body).toHaveTextContent('No requests yet');
    expect(document.body).toHaveTextContent('You have not submitted any time off requests.');
    expect(document.querySelector('[data-testid="empty-state-container"]')).toBeInTheDocument();
  });

  it('renders an action button and calls onAction when clicked', () => {
    const handleAction = vi.fn();

    render(
      <EmptyState
        icon="calendar-outline"
        title="No requests yet"
        description="You have not submitted any time off requests."
        actionLabel="Create request"
        onAction={handleAction}
      />,
    );

    const button = document.querySelector('ion-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Create request');

    fireEvent.click(button!);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
