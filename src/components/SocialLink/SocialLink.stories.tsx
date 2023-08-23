import type { Meta, StoryObj } from '@storybook/react'
import SocialLink from './SocialLink'

const meta = {
  title: 'SocialLink',
  component: SocialLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SocialLink>

export default meta
type Story = StoryObj<typeof meta>

export const VK: Story = {
  args: {
    social: 'vk',
    href: '/',
  },
}

export const Telegram: Story = {
  args: {
    social: 'telegram',
    href: '/',
  },
}
