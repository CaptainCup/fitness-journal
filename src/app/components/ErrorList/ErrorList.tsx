import { FC, memo } from 'react'

export type ErrorListProps = {
  errors: string[]
}

const ErrorList: FC<ErrorListProps> = ({ errors }) => {
  if (!errors.length) return null

  return (
    <div>
      {errors.map(error => (
        <p key={error} className="text-red-500 mb-5">
          {error}
        </p>
      ))}
    </div>
  )
}

export default memo(ErrorList)
