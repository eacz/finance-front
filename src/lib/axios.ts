import axios from 'axios'

export const transactionApi = axios.create({ baseURL: process.env.BACKEND_URL })