import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

it('Button click test', async () => {
  const onClick = jest.fn()

  render(<Button onClick={onClick}>Button</Button>)
  screen.debug()

  const button = screen.getByText('Button')

  await userEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})
