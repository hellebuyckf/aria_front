import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 120000
})

// Global error interceptor as per constitution
api.interceptors.response.use(
  response => response,
  error => {
    console.error('[API Error]', error.message)
    return Promise.reject(error)
  }
)

export default api
