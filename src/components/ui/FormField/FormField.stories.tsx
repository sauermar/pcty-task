import type { Meta, StoryObj } from '@storybook/react';
import { IonInput } from '@ionic/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  args: {
    label: 'Employee name',
    required: false,
    error: '',
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => (
    <FormField {...args}>
      <IonInput value="Sarah Jenkins" placeholder="Enter name" />
    </FormField>
  ),
};

export const Required: Story = {
  args: { label: 'Start date', required: true },
  render: (args) => (
    <FormField {...args}>
      <IonInput value="2026-11-10" placeholder="Select date" />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Reason',
    error: 'This field is required.',
  },
  render: (args) => (
    <FormField {...args}>
      <IonInput value="" placeholder="Add a reason" />
    </FormField>
  ),
};
