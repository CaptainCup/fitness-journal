import type { Meta, StoryObj } from '@storybook/react'
import MainPageCard from './MainPageCard'

const meta = {
  title: 'MainPageCard',
  component: MainPageCard,
  tags: ['autodocs'],
} satisfies Meta<typeof MainPageCard>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    attentionText: 'Attention text',
    href: '/',
    image: '/images/main/main-equipment.jpg',
  },
}
