import type { Meta, StoryObj } from '@storybook/react'
import Title from './Title'

const meta = {
  title: 'Title',
  component: Title,
  tags: ['autodocs'],
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    children: 'Title',
  },
}

export const Error: Story = {
  args: {
    children: 'Title',
    error: true,
  },
}
