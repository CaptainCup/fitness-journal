import BaseHttpService from './BaseHttpService'
import TokenStorageService from './TokenStorageService'

const tokenStorage = new TokenStorageService()

export default class AuthService extends BaseHttpService {
  async signIn(
    data = {},
    options = {},
  ): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const result = await this.post('/auth/signin', data, options)
    tokenStorage.setTokens(result)
    return result
  }

  async signUp(data = {}, options = {}): Promise<void> {
    return this.post('/auth/signup', data, options)
  }
}
