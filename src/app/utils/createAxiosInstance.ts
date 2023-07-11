import axios, { AxiosInstance } from 'axios'
import { TokenStorageService } from '@/app/services'
import { baseURL } from '@/app/utils'

const createAxiosInstance = (): AxiosInstance => {
  const tokenStorage = new TokenStorageService()

  let originalRequest: any

  const instance = axios.create({
    baseURL,
    timeout: 15000,
  })

  instance.interceptors.request.use(
    config => {
      const token = tokenStorage.getAccessToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    error => Promise.reject(error),
  )

  instance.interceptors.response.use(
    response => response,
    error => {
      originalRequest = error.config
      const refreshToken = tokenStorage.getRefreshToken()

      if (
        refreshToken &&
        error?.response?.status === 401 &&
        error?.response?.data?.message !==
          'Чтобы продолжить войдите на сервис или зарегистрируйтесь'
      ) {
        return instance.post(`/auth/tokens`, { refreshToken }).then(res => {
          if (res?.status === 201) {
            const tokens = res.data
            tokenStorage.setTokens(tokens)
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
            return axios(originalRequest).then(response => {
              const data = { ...response.data, tokens }
              return { ...response, data }
            })
          }
        })
      }

      return Promise.reject(error)
    },
  )

  return instance
}

export default createAxiosInstance
