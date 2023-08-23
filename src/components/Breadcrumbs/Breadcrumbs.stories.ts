import type { Meta, StoryObj } from '@storybook/react'

import Breadcrumbs from './Breadcrumbs'

const meta = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    path: [
      { label: 'Parent page', href: 'Parent' },
      { label: 'Child page', href: 'Child' },
    ],
  },
}
