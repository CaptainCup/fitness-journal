import { cookies } from 'next/headers'
import { baseURL } from '@/app/utils'
import { User } from '@/app/types'

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const authCookie = cookies().get('accessToken')?.value

    const res = await fetch(`${baseURL}/api/users/current`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCookie}`,
      },
    })

    return res.json()
  } catch {
    return null
  }
}

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const authCookie = cookies().get('accessToken')?.value

    const res = await fetch(`${baseURL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCookie}`,
      },
    })

    return res.json()
  } catch {
    return null
  }
}
