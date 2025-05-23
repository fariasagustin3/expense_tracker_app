import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import TotalCardList from '../components/dashboard/TotalCardList'
import BarChartComponent from '../components/dashboard/BarChartComponent'
import { useTransactionStore } from '../stores/useTransactionStore'
import { useApiClient } from '../hooks/useApiClient'
import type { Transaction } from '../types/dashboard'
import { formatDate } from '../utils/formatDate'
import TransactionsTable from '../components/transactions/TransactionsTable'

const DashboardPage: React.FC = () => {
  const { transactions, getAllTransactions } = useTransactionStore((state) => state)

  const { get } = useApiClient()
  const { firstDayOfMonth, currentDay } = formatDate(new Date())

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await get<Transaction[]>(`/transactions?startDate=${firstDayOfMonth}&endDate=${currentDay}`)
        if (response.data) {
          getAllTransactions(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getTransactions()
    
  }, [transactions.length, firstDayOfMonth, currentDay])

  return (
    <Layout>
      <div className='flex flex-col p-4 w-4/5 mb-10'>

        {/* card list */}
        <TotalCardList />

        {/* chart */}
        <BarChartComponent transactions={transactions} />

        {/* transaction list */}
        <TransactionsTable transactions={transactions} />
      </div>
    </Layout>
  )
}

export default DashboardPage