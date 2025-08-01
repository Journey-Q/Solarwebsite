// lib/api-client.ts
'use client'
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useSession, signOut, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { Session } from 'next-auth'

// Extend InternalAxiosRequestConfig to include our custom properties
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean
  _retry?: boolean
}

export function useApiClient() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const apiClient: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      const customConfig = config as CustomInternalAxiosRequestConfig
      
      // Check if this request requires authentication
      if (customConfig.requiresAuth) {
        // Get the latest session (this will trigger JWT callback and refresh if needed)
        const currentSession: Session | null = await getSession()
        
        if (!currentSession?.backendAccessToken) {
          // No token available, redirect to login
          signOut({ redirect: false })
          router.push('/auth')
          return Promise.reject(new Error('No access token available'))
        }

        // Check for refresh errors
        if (currentSession.error === 'RefreshBackendTokenError') {
          // Refresh failed, redirect to login
          signOut({ redirect: false })
          router.push('/auth')
          return Promise.reject(new Error('Token refresh failed'))
        }

        // Add authorization header with fresh token
        config.headers.Authorization = `Bearer ${currentSession.backendAccessToken}`
      }
      
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Token might be invalid, try to refresh session once more
        try {
          const refreshedSession: Session | null = await getSession()
          
          if (!refreshedSession?.backendAccessToken || refreshedSession.error) {
            // Still no valid token, redirect to login
            await signOut({ redirect: false })
            router.push('/auth')
          } else {
            // Token was refreshed, retry the original request
            const originalRequest = error.config as CustomInternalAxiosRequestConfig
            if (!originalRequest._retry) {
              originalRequest._retry = true
              originalRequest.headers.Authorization = `Bearer ${refreshedSession.backendAccessToken}`
              return apiClient(originalRequest)
            }
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          await signOut({ redirect: false })
          router.push('/auth')
        }
      }
      return Promise.reject(error)
    }
  )

  return {
    apiClient,
    session,
    status,
  
  }
}