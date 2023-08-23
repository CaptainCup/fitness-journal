import type { Meta, StoryObj } from '@storybook/react'
import Steps from './Steps'

const meta = {
  title: 'Steps',
  component: Steps,
  tags: ['autodocs'],
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Title',
    steps: [
      {
        image: '/images/logo-in-black.png',
        text: 'Step 1',
      },
      {
        image: '/images/logo-in-black.png',
        text: 'Step 2',
      },
      {
        image: '/images/logo-in-black.png',
        text: 'Step 3',
      },
    ],
  },
}
