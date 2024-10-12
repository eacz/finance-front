'use server'

import { AuthResponse } from '@/interfaces'
import { transactionApi } from '@/lib/axios'

const AUTH_URL_API = `${process.env.BACKEND_URL}/auth`

interface Payload {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  country: string
}

export const signup = async (payload: Payload) => {
  try {
    const { data } = await transactionApi.post<AuthResponse>(`${AUTH_URL_API}/signup`, payload)
    const { token, user } = data
    return { ok: true, token, user, message: 'Register successfully' }
  } catch (error: any) {
    console.log()
    return {
      ok: false,
      message: error?.response?.data?.message  || 'Unknown error, contact support',
    }
  }
}
