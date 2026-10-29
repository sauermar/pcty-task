import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
  argTypes: {
    status: {
      control: 'radio',
      options: ['pending', 'approved', 'rejected'],
    },
    size: {
      control: 'radio',
      options: ['small', 'default'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Pending: Story = { args: { status: 'pending', size: 'default' } };
export const Approved: Story = { args: { status: 'approved', size: 'default' } };
export const Rejected: Story = { args: { status: 'rejected', size: 'default' } };
export const SmallApproved: Story = { args: { status: 'approved', size: 'small' } };