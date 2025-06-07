import axios from 'axios'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
