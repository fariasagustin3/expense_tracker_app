import React, { useEffect, useState } from 'react'
import Topbar from './layout/Topbar'
import Leftbar from './layout/Leftbar'
import Rightbar from './layout/Rightbar'
import FormDialog from './ui/FormDialog'
import TextInput from './forms/TextInput'
import SelectInput from './forms/SelectInput'
import SubmitButton from './forms/SubmitButton'
import { useCategoryStore } from '../stores/useCategoryStore'
import { useGeneralStore } from '../stores/useGeneralStore'
import { useApiClient } from '../hooks/useApiClient'
import type { Category, Transaction } from '../types/dashboard'
import { useTransactionStore } from '../stores/useTransactionStore'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { categories, getAllCategories } = useCategoryStore((state) => state)
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
    } catch(error) {
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
      <FormDialog isOpen={isOpen} onClose={onClose} title='Create Transaction' onSubmit={handleSubmit}>
        <TextInput
          label='Title'
          placeholder='Enter a title'
          onChange={handleChange}
          type='text'
          name='title'
          value={transactionInput.title}
        />
        <TextInput
          label='Amount'
          placeholder='Enter the transaction amount'
          onChange={handleChange}
          type='number'
          name='amount'
          value={transactionInput.amount}
        />
        <SelectInput
          label='Type'
          onChange={handleSelectChange}
          name='type'
          value={transactionInput.type}
          options={[{ id: 'EXPENSE', name: 'EXPENSE' }, { id: 'INCOME', name: 'INCOME' }]}
        />
        <TextInput
          label='Description'
          placeholder='Enter the transaction description'
          onChange={handleChange}
          type='text'
          name='description'
          value={transactionInput.description}
        />
        <SelectInput
          label='Category'
          onChange={handleSelectChange}
          name='categoryId'
          value={transactionInput.categoryId}
          options={categories}
        />
        <SubmitButton text='Create transaction' />
      </FormDialog>
    </div>
  )
}

export default Layout
