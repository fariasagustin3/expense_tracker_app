import React, { useEffect, useState } from 'react'
import Topbar from './layout/Topbar'
import Leftbar from './layout/Leftbar'
import Rightbar from './layout/Rightbar'
import { useCategoryStore } from '../stores/useCategoryStore'
import { useGeneralStore } from '../stores/useGeneralStore'
import { useApiClient } from '../hooks/useApiClient'
import type { Category, Transaction } from '../types/dashboard'
import { useTransactionStore } from '../stores/useTransactionStore'
import CreateTransactionForm from './transactions/CreateTransactionForm'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { categories, getAllCategories } = useCategoryStore((state) => state)
  const [error, setError] = useState({
    title: false,
    amount: false,
    type: false,
    description: false,
    categoryId: false
  })
  const { setTransaction } = useTransactionStore((state) => state)
  const { isOpen, onClose } = useGeneralStore((state) => state)
  const { get, post } = useApiClient()
  const [transactionInput, setTransactionInput] = useState({
    title: '',
    amount: 0,
    type: '',
    description: '',
    categoryId: ''
  })

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await get<Category[]>('/categories')
        if (response.data) {
          getAllCategories(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionInput({
      ...transactionInput,
      [event.target.name]: event.target.value
    })

    if (event.target.value === '') {
      setError({
        ...error,
        [event.target.name]: true
      })
    } else {
      setError({
        ...error,
        [event.target.name]: false
      })
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionInput({
      ...transactionInput,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await post<Transaction>('/transactions', transactionInput)
      if (response.data) {
        setTransaction(response.data)
        setTransactionInput({ title: '', amount: 0, type: 'EXPENSE', description: '', categoryId: '' })
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative flex h-screen bg-gray-100 overflow-auto z-10'>
      <Leftbar />

      <Topbar>
        {children}

        <Rightbar />
      </Topbar>

      {/* form create transaction dialog */}
      <CreateTransactionForm
        isOpen={isOpen}
        onClose={onClose}
        title='Create Transaction'
        onSubmit={handleSubmit}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        transactionInput={transactionInput}
        error={error}
        categories={categories}
      />
    </div>
  )
}

export default Layout
