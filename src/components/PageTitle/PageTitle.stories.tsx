import type { Meta, StoryObj } from '@storybook/react'
import PageTitle from './PageTitle'

const meta = {
  title: 'PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof PageTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    image: '/images/logo-in-black.png',
    withBack: true,
  },
}
