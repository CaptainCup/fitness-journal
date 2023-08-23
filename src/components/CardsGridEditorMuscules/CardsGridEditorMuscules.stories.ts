import type { Meta, StoryObj } from '@storybook/react'

import CardsGridEditorMuscules from './CardsGridEditorMuscules'

const meta = {
  title: 'CardsGridEditorMuscules',
  component: CardsGridEditorMuscules,
  tags: ['autodocs'],
} satisfies Meta<typeof CardsGridEditorMuscules>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Muscules cards',
  },
}
