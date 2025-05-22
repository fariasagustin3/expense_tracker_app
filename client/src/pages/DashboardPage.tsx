import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import TotalCardList from '../components/dashboard/TotalCardList'
import BarChartComponent from '../components/dashboard/BarChartComponent'
import { useTransactionStore } from '../stores/useTransactionStore'
import { useApiClient } from '../hooks/useApiClient'
import type { Transaction } from '../types/dashboard'

const DashboardPage: React.FC = () => {
  const { transactions, getAllTransactions } = useTransactionStore((state) => state)
  const { get } = useApiClient()

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await get<Transaction[]>('/transactions')
        if(response.data) {
          getAllTransactions(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getTransactions()
  }, [])

  return (
    <Layout>
      <div className='flex flex-col p-4 w-4/5'>

        {/* card list */}
        <TotalCardList />

        {/* chart */}
        <BarChartComponent transactions={transactions} />

        {/* transaction list */}
      </div>
    </Layout>
  )
}

export default DashboardPage