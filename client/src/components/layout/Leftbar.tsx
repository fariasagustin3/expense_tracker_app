import React from 'react'
import SidebarItem from './SidebarItem'
import { MdDashboard } from 'react-icons/md'
import { GrTransaction } from 'react-icons/gr'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaSignOutAlt } from 'react-icons/fa'

const Leftbar: React.FC = () => {
  return (
    <aside className={'bg-white p-4 flex flex-col gap-6 transition-all duration-300 w-60'}>
      <div className='text-blue-600 font-bold text-xl transition-all duration-300 overflow-hidden whitespace-nowrap'>
        Expense Tracker
      </div>
      <SidebarItem icon={<MdDashboard size={20} />} label='Dashboard' route='/' />
      <SidebarItem icon={<GrTransaction size={20} />} label='Transactions' route='/transactions' />
      <SidebarItem icon={<BiCategoryAlt size={20} />} label='Categories' route='/categories' />

      <span className='mt-auto text-red-500'>
        <button className='text-gray-700 transition-all duration-300 hover:text-red-600 cursor-pointer flex items-center gap-2'>
          <FaSignOutAlt size={20} />
          Logout
        </button>
      </span>
    </aside>
  )
}

export default Leftbar
