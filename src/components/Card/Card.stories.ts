import type { Meta, StoryObj } from '@storybook/react'

import Card from './Card'

const meta = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Card',
    className: 'h-48',
  },
}

export const Link: Story = {
  args: {
    title: 'Card',
    className: 'h-48',
    link: '/',
  },
}

export const Checked: Story = {
  args: {
    title: 'Card',
    className: 'h-48',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    title: 'Card',
    className: 'h-48',
    disabled: true,
  },
}

export const WithMenu: Story = {
  args: {
    title: 'Card',
    className: 'h-48',
    menu: [
      {
        label: 'Menu item 1',
        onClick: () => null,
      },
      {
        label: 'Menu item 2',
        onClick: () => null,
      },
      {
        label: 'Menu item 3',
        danger: true,
        onClick: () => null,
      },
    ],
  },
}
