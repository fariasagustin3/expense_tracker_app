import { Route } from 'wouter'
import DashboardPage from '../pages/DashboardPage'
import TransactionsPage from '../pages/TransactionsPage'
import CategoriesPage from '../pages/CategoriesPage'
import ProfilePage from '../pages/ProfilePage'

const PrivateRoutes = () => {
  return (
    <>
      <Route path='/' component={DashboardPage} />
      <Route path='/transactions' component={TransactionsPage} />
      <Route path='/categories' component={CategoriesPage} />
      <Route path='/profile' component={ProfilePage} />
    </>
  )
}

export default PrivateRoutes
