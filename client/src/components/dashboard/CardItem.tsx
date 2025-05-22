import React, { useMemo } from 'react'

interface CardItemProps {
  title: string
  amount: number
}

const CardItem: React.FC<CardItemProps> = ({ title, amount }) => {

  const formattedAmount = useMemo(() => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount)
  }, [amount])

  return (
    <div className='flex border border-gray-300 rounded-md p-4 bg-white flex-1 shadow-md'>
      <div className='flex flex-col gap-6'>
        <h3 className='font-semibold text-sm'>{title}</h3>
        <p className='font-semibold text-3xl'>{formattedAmount}</p>
      </div>
    </div>
  )
}

export default CardItem
