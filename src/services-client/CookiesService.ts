import cookies from 'js-cookie'

export default class Cookies {
  get = (name: string): string | undefined => {
    return cookies.get(name)
  }

  set = (
    name: string,
    value: string,
    options = { expires: 30 },
  ): string | undefined => {
    return cookies.set(name, value, options)
  }

  remove = (name: string): void => {
    return cookies.remove(name)
  }
}
