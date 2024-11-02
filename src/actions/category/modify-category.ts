'use server'

import { transactionApi } from '@/lib/axios'
import { Category } from '@/modules/category'

interface Payload {
  id: number
  name: string
  description?: string
}

export const modifyCategory = async (token: string, payload: Payload) => {
  const { id, ...body } = payload
  try {
    const { data } = await transactionApi.put<Category>(`/category/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { ok: true, data }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
