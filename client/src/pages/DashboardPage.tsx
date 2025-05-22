import React from 'react'
import Layout from '../components/Layout'
import TotalCardList from '../components/dashboard/TotalCardList'
import BarChartComponent from '../components/dashboard/BarChartComponent'

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className='flex flex-col p-4 w-4/5'>
        
        {/* card list */}
        <TotalCardList />

        {/* chart */}
        <BarChartComponent transactions={[]} />

        {/* transaction list */}
      </div>
    </Layout>
  )
}

export default DashboardPage