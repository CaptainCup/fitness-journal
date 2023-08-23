import type { Meta, StoryObj } from '@storybook/react'
import Select from './Select'

const meta = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    options: [
      {
        label: 'Test 1',
        value: 'Test 1',
      },
      {
        label: 'Test 2',
        value: 'Test 2',
      },
      {
        label: 'Test 3',
        value: 'Test 3',
        danger: true,
      },
    ],
    placeholder: 'Placeholder',
  },
}
