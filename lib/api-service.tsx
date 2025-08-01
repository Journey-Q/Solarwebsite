'use client'
import { useApiClient } from './api-client'
import type { AxiosResponse } from 'axios'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  status: number
  headers?: any
  details?: any
}

interface RequestOptions {
  isAuth?: boolean
  params?: Record<string, any>
  headers?: Record<string, string>
}

export function useApiService() {
  const { apiClient, session, status } = useApiClient()

  // Helper function to handle API responses
  const handleResponse = <T = any>(response: AxiosResponse<T>): ApiResponse<T> => ({
    success: true,
    data: response.data,
    status: response.status,
    headers: response.headers,
  })

  // Helper function to handle API errors
  const handleError = (error: any): ApiResponse => ({
    success: false,
    error: error.response?.data?.message || error.message || 'An error occurred',
    status: error.response?.status || 500,
    details: error.response?.data || null,
  })

  // GET method
  const get = async <T = any>(
    path: string,
    { isAuth = true, params = {}, headers = {} }: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<T>(path, {
        params,
        headers,
        requiresAuth: isAuth,
      } as any)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  }

  // POST method
  const post = async <T = any>(
    path: string,
    data = {},
    { isAuth = true, params = {}, headers = {} }: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T>(path, data, {
        params,
        headers,
        requiresAuth: isAuth,
      } as any)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  }

  // PUT method
  const put = async <T = any>(
    path: string,
    data = {},
    { isAuth = true, params = {}, headers = {} }: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<T>(path, data, {
        params,
        headers,
        requiresAuth: isAuth,
      } as any)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  }

  // PATCH method
  const patch = async <T = any>(
    path: string,
    data = {},
    { isAuth = true, params = {}, headers = {} }: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<T>(path, data, {
        params,
        headers,
        requiresAuth: isAuth,
      } as any)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  }

  // DELETE method
  const del = async <T = any>(
    path: string,
    { isAuth = true, params = {}, headers = {} }: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(path, {
        params,
        headers,
        requiresAuth: isAuth,
      } as any)
      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  }

  return {
    // HTTP methods
    get,
    post,
    put,
    patch,
    delete: del,
    apiClient,
  }
}