import React from 'react'
import CardItem from './CardItem'

const TotalCardList: React.FC = () => {
  return (
    <div className='flex items-center gap-4 w-full'>
      <CardItem title='Monthly Expenses' amount={22500} />
      <CardItem title='Monthly Income' amount={75000} />
      <CardItem title='Total Balance' amount={52500} />
    </div>
  )
}

export default TotalCardList
