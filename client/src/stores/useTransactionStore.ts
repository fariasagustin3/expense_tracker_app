import { create } from 'zustand'
import type { Transaction } from '../types/dashboard'

type TransactionState = {
  transactions: Transaction[]
  getAllTransactions: (transactions: Transaction[]) => void,
  setTransaction: (transaction: Transaction) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  getAllTransactions: (transactions: Transaction[]) => set({ transactions }),
  setTransaction: (transaction: Transaction) => set((state) => ({ transactions: [...state.transactions, transaction] }))
}))
