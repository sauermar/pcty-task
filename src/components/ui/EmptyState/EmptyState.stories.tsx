import type { Meta, StoryObj } from '@storybook/react';
import { calendarOutline } from 'ionicons/icons';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'UI/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: calendarOutline,
    title: 'No Requests Found',
    description: 'You have not submitted any time off requests yet.',
    actionLabel: 'Submit Request',
    onAction: () => alert('Action clicked'),
  },
};
