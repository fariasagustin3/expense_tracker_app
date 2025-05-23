import React from 'react'
import GeneralBalanceCard from './GeneralBalanceCard'
import Button from '../ui/Button'
import { useTransactionStore } from '../../stores/useTransactionStore'

const Rightbar: React.FC = () => {
  const { transactions } = useTransactionStore((state) => state)

  return (
    <aside className='flex h-screen flex-col bg-white p-4 w-60 ml-auto fixed right-0 rounded-b-md'>
      <GeneralBalanceCard totalTransactions={transactions.length} />
      <Button
        label='Add Transaction'
      />
    </aside>
  )
}

export default Rightbar
