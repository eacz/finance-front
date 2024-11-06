'use server'

import { transactionApi } from '@/lib/axios'
import { Category } from '@/modules/category'
import { avalaibleIcons } from '@/utils'

interface Payload {
  name: string
  description?: string
  icon: avalaibleIcons
}

export const createCategory = async (token: string, payload: Payload) => {
  try {
    const { data } = await transactionApi.post<Category>(`/category`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return {
      ok: true,
      data,
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
