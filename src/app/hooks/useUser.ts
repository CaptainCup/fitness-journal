import useSWR from 'swr'
import { UserService } from '@/app/services'

const userApi = new UserService()

const useUser = () => {
  const { data: user, mutate } = useSWR(`current-user`, async () => {
    try {
      const user = await userApi.getCurrent()
      return user
    } catch {
      return null
    }
  })

  return { user, mutate }
}

export default useUser
