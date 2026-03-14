import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const authData = localStorage.getItem('dencone-auth')
      if (authData) {
        const parsed = JSON.parse(authData)
        if (parsed.state?.token) {
          config.headers.Authorization = `Bearer ${parsed.state.token}`
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
  return config
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dencone-auth')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
