import type { Meta, StoryObj } from '@storybook/react'

import Image from './Image'

const meta = {
  title: 'Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    src: '/images/logo-in-black.png',
    alt: 'Image',
    width: 100,
    height: 100,
  },
}
