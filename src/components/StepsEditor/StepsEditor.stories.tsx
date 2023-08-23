import type { Meta, StoryObj } from '@storybook/react'
import StepsEditor from './StepsEditor'

const meta = {
  title: 'StepsEditor',
  component: StepsEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof StepsEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Title',
  },
}
