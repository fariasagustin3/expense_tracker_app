import React from 'react'

const GeneralBalanceCard: React.FC = () => {
  return (
    <div className='w-full h-1/5 border border-gray-300 rounded-md mb-2 flex flex-col gap-2 px-4 py-6'>
      <h3 className='font-semibold text-sm'>General Balance</h3>
      <p className='font-semibold text-3xl'>$0</p>
    </div>
  )
}

export default GeneralBalanceCard
