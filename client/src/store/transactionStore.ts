import { create } from "zustand"
import { Transaction } from "../types/dashboard"

export interface TransactionState {
    transactions: Transaction[],
    getAllTransactions: (transactions: Transaction[]) => void,
    createTransaction: (transaction: Transaction) => void
}

export const useTransactionsStore = create<TransactionState>((set) => ({
    transactions: [],
    getAllTransactions: (transactions: Transaction[]) => set({ transactions }),
    createTransaction: (transaction: Transaction) => set((state) => ({ transactions: [...state.transactions, transaction] }))
}))