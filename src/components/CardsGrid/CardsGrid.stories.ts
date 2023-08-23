import type { Meta, StoryObj } from '@storybook/react'

import CardsGrid from './CardsGrid'

const meta = {
  title: 'CardsGrid',
  component: CardsGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof CardsGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Title',
    cards: [{ title: 'Card 1' }, { title: 'Card 2' }, { title: 'Card 3' }],
  },
}
