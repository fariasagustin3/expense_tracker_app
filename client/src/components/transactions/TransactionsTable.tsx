import React from 'react'
import type { Transaction } from '../../types/dashboard'
import { formatAmount } from '../../utils/formatAmount'

interface TransactionTableProps {
  transactions: Transaction[]
}

const TransactionsTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className='bg-white p-10 rounded-2xl shadow-md'>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='p-2 text-left text-sm font-medium'>Title</th>
            <th className='p-2 text-left text-sm font-medium'>Amount</th>
            <th className='p-2 text-left text-sm font-medium'>Category</th>
            <th className='p-2 text-left text-sm font-medium'>Type</th>
            <th className='p-2 text-left text-sm font-medium'>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 3).map((transaction: Transaction, index: number) => (
            <tr key={transaction.id} className={index % 2 !== 0 ? 'bg-gray-100' : ''}>
              <td className='p-2 text-xs'>{transaction.title}</td>
              <td className='p-2 text-xs'>{formatAmount(transaction.amount, 'ARS')}</td>
              <td className='p-2 text-xs'>
                <div>
                  <div className='inline-block h-2 w-2 rounded-full mr-2' style={{ backgroundColor: transaction.category.color }}></div>
                  {transaction.category.name}
                </div>
              </td>
              <td className={`p-2 text-xs ${transaction.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'}`}>{transaction.type}</td>
              <td className='p-2 text-xs'>{transaction.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
