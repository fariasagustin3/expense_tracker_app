import React, { useEffect, useState } from 'react'
import type { Transaction } from '../../types/dashboard'
import { formatAmount } from '../../utils/formatAmount'
import { formatDate } from '../../utils/formatDate'
import { useApiClient } from '../../hooks/useApiClient'
import { useTransactionStore } from '../../stores/useTransactionStore'

const TransactionsTable: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { dailyTransactions, getDailyTransactions } = useTransactionStore((state) => state)
  const { get } = useApiClient()
  const { subDays, addDays } = formatDate(currentDate)

  const goToPreviousDay = () => setCurrentDate(prev => subDays(prev, 1))
  const goToNextDay = () => setCurrentDate(prev => addDays(prev, 1))

  useEffect(() => {
    const fetchDailyTransactions = async (date: Date) => {
      const { currentStartOfDay, currentEndOfDay } = formatDate(date)

      try {
        const response = await get<Transaction[]>(
          `/transactions?startDate=${currentStartOfDay}&endDate=${currentEndOfDay}`
        )
        if (response.data) getDailyTransactions(response.data)
      } catch (error) {
        console.error('Error al obtener transacciones:', error)
      }
    }

    fetchDailyTransactions(currentDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate])

  return (
    <div className='bg-white p-10 rounded-2xl shadow-md'>
      <div className='flex items-center justify-between px-4'>
        <h1 className='mb-4 text-2xl font-semibold gap-4'>
          Transactions
        </h1>
        <div className='flex items-center gap-2'>
          <button onClick={goToPreviousDay} className='text-3xl cursor-pointer'>◁</button>
          <span className='text-sm'>{currentDate.toLocaleDateString()}</span>
          <button onClick={goToNextDay} className='text-3xl cursor-pointer'>▷</button>
        </div>
      </div>
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
          {dailyTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                There is no transactions for this day
              </td>
            </tr>
          ) : (
            dailyTransactions
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((transaction, index) => (
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
                  <td className='p-2 text-xs'>{formatDate(new Date(transaction.createdAt)).beautifyDate}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
