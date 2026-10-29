import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SegmentFilter } from './SegmentFilter';

describe('SegmentFilter', () => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
  ];

  it('renders all filter labels', () => {
    render(<SegmentFilter value="all" options={options} onChange={() => {}} />);

    const segment = document.querySelector('ion-segment');
    const buttons = document.querySelectorAll('ion-segment-button');

    expect(segment).toBeInTheDocument();
    expect(buttons).toHaveLength(3);
    expect(document.querySelectorAll('ion-label')).toHaveLength(3);
  });

  it('renders the provided options with the current selection', () => {
    render(<SegmentFilter value="pending" options={options} onChange={() => {}} />);

    const segment = document.querySelector('ion-segment');
    const buttons = document.querySelectorAll('ion-segment-button');

    expect(segment).toBeInTheDocument();
    expect(buttons).toHaveLength(3);
    expect(Array.from(buttons).every((button) => button.tagName === 'ION-SEGMENT-BUTTON')).toBe(true);
  });
});
