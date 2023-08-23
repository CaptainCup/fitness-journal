import type { Meta, StoryObj } from '@storybook/react'
import ShareButton from './ShareButton'

const meta = {
  title: 'ShareButton',
  component: ShareButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShareButton>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Title',
  },
}
