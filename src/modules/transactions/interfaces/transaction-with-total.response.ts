import { Transaction } from "./transaction";

export interface TransactionWithTotal {
  transactions: Transaction[]
  total: number
}