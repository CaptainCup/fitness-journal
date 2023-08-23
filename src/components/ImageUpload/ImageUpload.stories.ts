import type { Meta, StoryObj } from '@storybook/react'

import ImageUpload from './ImageUpload'

const meta = {
  title: 'ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {},
}
