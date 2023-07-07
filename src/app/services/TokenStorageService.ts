import Cookies from './CookiesService'

export default class TokenStorageService {
  private cookies

  constructor() {
    this.cookies = new Cookies()
  }

  setTokens = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string
    refreshToken: string
  }) => {
    this.cookies.set('accessToken', accessToken, { expires: 30 })
    this.cookies.set('refreshToken', refreshToken, { expires: 365 })
  }

  getAccessToken = () => {
    return this.cookies.get('accessToken')
  }

  getRefreshToken = () => {
    return this.cookies.get('refreshToken')
  }

  clearTokens = () => {
    this.cookies.remove('accessToken')
    this.cookies.remove('refreshToken')
  }
}
