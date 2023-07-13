import BaseHttpService from './BaseHttpService'
import TokenStorageService from './TokenStorageService'

const tokenStorage = new TokenStorageService()

export default class AuthService extends BaseHttpService {
  async signIn(data = {}, options = {}): Promise<void> {
    const result = await this.post('/auth/signin', data, options)
    tokenStorage.setTokens(result)
  }

  async signUp(data = {}, options = {}): Promise<void> {
    const result = await this.post('/auth/signup', data, options)
    tokenStorage.setTokens(result)
  }

  signOut = (): void => {
    tokenStorage.clearTokens()
  }
}
