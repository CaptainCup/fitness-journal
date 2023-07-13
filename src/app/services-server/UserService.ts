import { cookies } from 'next/headers'
import { baseURL } from '../utils'

export const getCurrentUser = async () => {
  const authCookie = cookies().get('accessToken')?.value

  const res = await fetch(`${baseURL}/api/users/current`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${authCookie}`,
    },
  })
  return res.json()
}

export const getUserById = async (id: string) => {
  const authCookie = cookies().get('accessToken')?.value

  const res = await fetch(`${baseURL}/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${authCookie}`,
    },
  })
  return res.json()
}
