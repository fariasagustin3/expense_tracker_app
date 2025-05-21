import React from 'react'
import Topbar from './layout/Topbar'
import Leftbar from './layout/Leftbar'
import Rightbar from './layout/Rightbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen bg-gray-100 overflow-auto z-10'>
      <Leftbar />

      <Topbar>
        {children}
        
        <Rightbar />
      </Topbar>
    </div>
  )
}

export default Layout
