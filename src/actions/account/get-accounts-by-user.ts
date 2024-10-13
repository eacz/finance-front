'use server'

import { transactionApi } from '@/lib/axios'
import { getAccountsByUserResponse } from '@/modules/account/interfaces/get-accounts-by-user.response'

export const getAccountsByUser = async (token: string) => {
  try {
    const { data } = await transactionApi.get<getAccountsByUserResponse[]>('/account/by-user', {
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
