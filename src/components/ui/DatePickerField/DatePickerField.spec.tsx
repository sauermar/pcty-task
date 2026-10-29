import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePickerField } from './DatePickerField';

describe('DatePickerField', () => {
  it('shows the selected formatted date', () => {
    render(
      <DatePickerField id="start-date" value="2026-10-15" onChange={() => {}} min="2026-10-01" />,
    );

    expect(document.body).toHaveTextContent('Oct 15, 2026');
  });

  it('shows a placeholder when value is empty', () => {
    render(<DatePickerField id="end-date" value="" onChange={() => {}} />);

    expect(document.body).toHaveTextContent('Select date');
  });

  it('renders a datetime popover target and minimum prop', () => {
    render(
      <DatePickerField id="start-date" value="2026-10-15" onChange={vi.fn()} min="2026-10-01" />,
    );

    const popover = document.querySelector('ion-popover');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute('trigger', 'start-date');
    expect(popover).toHaveAttribute('alignment', 'center');
  });
});
