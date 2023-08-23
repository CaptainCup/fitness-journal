import type { Meta, StoryObj } from '@storybook/react'
import { Card, InfiniteList } from '@/components'

const meta = {
  title: 'InfiniteList',
  component: InfiniteList,
  tags: ['autodocs'],
} satisfies Meta<typeof InfiniteList>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    useWindow: false,
    pageLimit: 24,
    endpoint: 'equipment',
    renderItem: item => (
      <Card key={item._id} title={item.name} image={item.image} {...item} />
    ),
  },
}
