import axios, { AxiosInstance } from 'axios'
import { GetServerSidePropsContext, NextPageContext } from 'next'

const createAxiosInstance = (
  ctx?: NextPageContext | GetServerSidePropsContext,
): AxiosInstance => {
  const baseURL = 'http://localhost:4000/api'

  const instance = axios.create({
    baseURL,
    timeout: 15000,
  })

  return instance
}

export default createAxiosInstance
