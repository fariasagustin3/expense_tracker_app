import React from 'react'
import { Link } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  return <div>
    <Link to="/transactions">transactions</Link>
    <Link to="/profile">profile</Link>
    <Link to="/categories">categories</Link>
    DashboardPage
    </div>
}

export default DashboardPage