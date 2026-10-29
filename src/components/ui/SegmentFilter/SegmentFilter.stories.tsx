import type { Meta, StoryObj } from '@storybook/react';
import { SegmentFilter } from './SegmentFilter';

const options: Array<{ value: 'all' | 'pending' | 'approved' | 'rejected'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const meta: Meta<typeof SegmentFilter> = {
  title: 'UI/SegmentFilter',
  component: SegmentFilter,
  args: {
    value: 'all',
    options,
    onChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof SegmentFilter>;

export const Default: Story = {};

export const PendingSelected: Story = {
  args: {
    value: 'pending',
  },
};
