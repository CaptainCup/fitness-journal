import { cookies } from 'next/headers'

export default class Cookies {
  get = (name: string) => {
    return cookies().get(name)
  }

  set = (name: string, value: string, options = { expires: 30 }) => {
    return cookies().set(name, value, options)
  }
}
