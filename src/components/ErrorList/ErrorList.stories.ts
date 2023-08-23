import type { Meta, StoryObj } from '@storybook/react'

import ErrorList from './ErrorList'

const meta = {
  title: 'ErrorList',
  component: ErrorList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorList>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    errors: ['Error 1', 'Error 2', 'Error 3'],
  },
}
