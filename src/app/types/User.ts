export type AuthToken = {
  accessToken: string
  refreshToken: string
}

export type User = {
  _id?: string
  firstName?: string
  lastName?: string
  middleName?: string
  avatar?: string
  phone: string
  tokens?: AuthToken
}
