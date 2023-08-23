import React, { forwardRef } from 'react'

type DefaultCustomInputProps = {
  date: string
  onClick?: () => void
}

const DefaultCustomInput = forwardRef<
  HTMLParagraphElement,
  DefaultCustomInputProps
>(({ date, onClick }, ref) => {
  return (
    <p
      className="border-b-2 border-black cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      {date}
    </p>
  )
})

DefaultCustomInput.displayName = 'DefaultCustomInput'

export default DefaultCustomInput
