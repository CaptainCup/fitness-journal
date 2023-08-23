import type { Meta, StoryObj } from '@storybook/react'
import MeasurementEditor from './MeasurementEditor'

const meta = {
  title: 'MeasurementEditor',
  component: MeasurementEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof MeasurementEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    title: 'Title',
  },
}

export const Error: Story = {
  args: {
    title: 'Title',
    error: true,
  },
}
