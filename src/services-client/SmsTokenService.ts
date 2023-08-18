import BaseHttpService from './BaseHttpService'

export default class SmsTokenService extends BaseHttpService {
  async sendCode(data = {}, options = {}): Promise<void> {
    return this.post('/sms', data, options)
  }
}
