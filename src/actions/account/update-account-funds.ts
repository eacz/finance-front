'use server'

import { transactionApi } from '@/lib/axios'
import { UpdateAccountFundsResponse } from '@/modules/account/interfaces/update-account-funds.response'

interface Payload {
  amount: number
  accountId: number
}

export const updateAccountFunds = async (token: string, { accountId, amount }: Payload) => {
  try {
    const { data } = await transactionApi.put<UpdateAccountFundsResponse>(
      `/account/${accountId}`,
      { action: 'SET', amount },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
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
