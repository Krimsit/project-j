import axios from 'axios'
import { QueryClient } from '@tanstack/react-query'
import { getStoredToken } from '@context'

export const queryClient = new QueryClient()

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

httpClient.interceptors.request.use((config) => {
  const token = getStoredToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
