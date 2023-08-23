import type { Meta, StoryObj } from '@storybook/react'

import CardsGridEditor from './CardsGridEditor'

const meta = {
  title: 'CardsGridEditor',
  component: CardsGridEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof CardsGridEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Equipment cards',
    endpoint: 'equipment',
  },
}
