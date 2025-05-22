import { create } from 'zustand'
import type { Transaction } from '../types/dashboard'

type TransactionState = {
  transactions: Transaction[]
  getAllTransactions: (transactions: Transaction[]) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  getAllTransactions: (transactions: Transaction[]) => set({ transactions })
}))
