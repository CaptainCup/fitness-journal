import type { Meta, StoryObj } from '@storybook/react'

import Calendar from './Calendar'

const meta = {
  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    value: new Date(),
  },
}
