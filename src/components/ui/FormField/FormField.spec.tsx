import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders the label and child content', () => {
    render(
      <FormField label="Employee name">
        <input aria-label="Employee name input" defaultValue="Alice" />
      </FormField>,
    );

    expect(screen.getByText('Employee name')).toBeInTheDocument();
    expect(screen.getByLabelText('Employee name input')).toHaveValue('Alice');
  });

  it('shows required star and validation error', () => {
    render(
      <FormField label="Start date" required error="Start date is required">
        <input aria-label="Start date input" />
      </FormField>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('Start date is required')).toBeInTheDocument();
  });
});
