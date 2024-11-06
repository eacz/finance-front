'use server'

import { transactionApi } from '@/lib/axios'
import { Category } from '@/modules/category'
import { avalaibleIcons } from '@/utils'

interface Payload {
  id: number
  name: string
  description?: string
  icon: avalaibleIcons
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
