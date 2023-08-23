import type { Meta, StoryObj } from '@storybook/react'
import Textarea from './Textarea'

const meta = {
  title: 'Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    placeholder: 'Placeholder',
  },
}
