'use server';

import { transactionApi } from '@/lib/axios'
import { Category } from '@/modules/category';

export const getCategoriesByUser = async (token: string) => {
  try {
    const { data } = await transactionApi.get<Category[]>('/category/', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return {
      ok: true,
      data,
      message: 'Ok',
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
