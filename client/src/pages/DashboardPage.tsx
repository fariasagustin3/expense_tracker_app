import React from 'react'
import Layout from '../components/Layout'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 400,
  },
  {
    name: 'Page B',
    uv: 500,
  },
  {
    name: 'Page C',
    uv: 200,
  },
  {
    name: 'Page D',
    uv: 900,
  },
  {
    name: 'Page E',
    uv: 500,
  },
]

const transactions = [
  {
    id: 'sdfwe23ds2eda',
    amount: 1000,
    category: 'Groceries',
    date: new Date(),
    type: 'Expense'
  },
  {
    id: 'asdasdw43rwedd',
    amount: 230,
    category: 'Gaming',
    date: new Date(),
    type: 'Expense'
  },
  {
    id: 'ksjdfiuwehiuf',
    amount: 6000,
    category: 'Salary',
    date: new Date(),
    type: 'Income'
  },
  {
    id: 'dhayusgduysdtcs',
    amount: 700,
    category: 'Rent',
    date: new Date(),
    type: 'Expense'
  },
  {
    id: 'asdadfalsdifuiwueh',
    amount: 1000,
    category: 'Supermarket',
    date: new Date(),
    type: 'Expense'
  },
  {
    id: 'fsdofjioer8uf9weifiwe',
    amount: 2000,
    category: 'Freelancer work',
    date: new Date(),
    type: 'Income'
  },
  {
    id: 'asdjlj98dhi982hd3',
    amount: 200,
    category: 'Pets',
    date: new Date(),
    type: 'Expense'
  },
]

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 pb-6'>
        <div className='flex items-center justify-center gap-5 bg-white py-5 rounded-lg'>
          <div className='w-[250px] h-[100px] border border-gray-400 rounded-md bg-white'>
            <div className='flex flex-col gap-2 py-5 px-5'>
              <h3 className='text-xs text-gray-800'>Monthly Expenses</h3>
              <h1 className='text-2xl font-bold'>$2000</h1>
            </div>
          </div>

          <div className='w-[250px] h-[100px] border border-gray-400 rounded-md bg-white'>
            <div className='flex flex-col gap-2 py-5 px-5'>
              <h3 className='text-xs text-gray-800'>Monthly Income</h3>
              <h1 className='text-2xl font-bold'>$2000</h1>
            </div>
          </div>

          <div className='w-[250px] h-[100px] border border-gray-400 rounded-md bg-white'>
            <div className='flex flex-col gap-2 py-5 px-5'>
              <h3 className='text-xs text-gray-800'>Total transactions</h3>
              <h1 className='text-2xl font-bold'>127</h1>
            </div>
          </div>
        </div>

        {/* chart section */}
        <div className='bg-white p-5 rounded-lg'>
          <h1 className='text-xl font-semibold'>Expenses chart</h1>
          <div className='mt-10 flex flex-col items-center justify-center'>
            <LineChart width={800} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>

        {/* transactions section */}
        <div className='bg-white p-5 rounded-lg'>
          <table className='min-w-full text-sm text-left'>
            <thead>
              <tr className='bg-gray-100'>
                <th className="p-3">Transaction</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className='border-b border-gray-300'>
                  <td className="p-3">{transaction.type}</td>
                  <td className="p-3">{transaction.category}</td>
                  <td className="p-3">${transaction.amount}</td>
                  <td className="p-3">{transaction.date.toDateString()}</td>
                  <td className="p-3">View</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>Showing Page 1 of 10</span>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 border rounded">Prev</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
              <button className="px-2 py-1 border rounded">2</button>
              <button className="px-2 py-1 border rounded">3</button>
              <span className="px-2">...</span>
              <button className="px-2 py-1 border rounded">10</button>
              <button className="px-2 py-1 border rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default DashboardPage
