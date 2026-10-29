import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerField } from './DatePickerField';

const meta: Meta<typeof DatePickerField> = {
  title: 'UI/DatePickerField',
  component: DatePickerField,
  args: {
    id: 'story-date-picker',
    value: '2026-11-10',
    min: '2026-01-01',
    onChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerField>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    value: '',
  },
};
