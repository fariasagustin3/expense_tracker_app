import { useNavigate } from "react-router-dom";
import { LayoutProps } from "../types/dashboard";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import api from "../api/auth";

interface Transaction {
  title: string;
  amount: number;
  type: string;
  description: string;
  categoryId: string;
}

interface Category {
  id: string
  name: string
  color: string
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [transaction, setTransaction] = useState<Transaction>({
    title: "",
    amount: 0,
    type: "EXPENSE",
    description: "",
    categoryId: ""
  })

  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().setToken(null);
    navigate("/login");
  };

  const handleTransactionChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      api.post('/transactions', transaction)
      alert('Transaction created successfully')
      setOpenModal(false)
      setTransaction({
        title: "",
        amount: 0,
        type: "EXPENSE",
        description: "",
        categoryId: ""
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        setCategories(res.data)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>
        <nav className="flex flex-col space-y-4">
          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/")}
          >
            Dashboard
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/transactions")}
          >
            Transactions
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/categories")}
          >
            Categories
          </button>
          <button
            className="text-left px-4 py-2 mt-20 rounded text-red-400 hover:text-red-500 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
          <div className="cursor-pointer" onClick={() => navigate("/profile")}>
            <img
              src="/user-icon.png"
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto flex gap-6">
          <div className="flex-1">
            {children}
          </div>
          <div className="w-1/4 bg-white border border-gray-300 rounded p-4 flex flex-col items-center">
            <div className='w-[250px] h-[200px] border border-gray-400 rounded-md bg-white'>
              <div className='flex flex-col gap-2 py-5 px-5'>
                <h3 className='text-md text-gray-800'>Monthly Income</h3>
                <h1 className='text-4xl font-bold'>$2000</h1>
                <hr className="mt-3" />
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-gray-900 text-white px-4 py-2 mt-4 rounded-md hover:bg-gray-800 transition cursor-pointer"
                >
                  Add new transaction
                </button>

                {/* modal */}
                  <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white/50 transition-opacity duration-300 ${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative transform transition-all duration-300 ${openModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                      {/* Close button */}
                      <button
                        onClick={() => setOpenModal(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                      >
                        ✕
                      </button>

                      {/* Header */}
                      <h2 className="text-xl font-semibold mb-1">New expense</h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Fill in the appropriate details to log your expense
                      </p>

                      {/* Form */}
                      <form onSubmit={handleCreateTransaction} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={transaction.title}
                            onChange={handleTransactionChange}
                            placeholder="Enter the merchant's name"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Amount</label>
                          <input
                            type="number"
                            name="amount"
                            value={transaction.amount}
                            onChange={handleTransactionChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category of expense</label>
                          <select
                            name="categoryId"
                            value={transaction.categoryId}
                            onChange={handleTransactionChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Transaction type</label>
                          <select
                            name="type"
                            value={transaction.type}
                            onChange={handleTransactionChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                          >
                            <option value="EXPENSE">EXPENSE</option>
                            <option value="INCOME">INCOME</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <input
                            type="text"
                            name="description"
                            value={transaction.description}
                            onChange={handleTransactionChange}
                            placeholder="Payment description"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                          />
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
                          >
                            CREATE
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                {/* end modal */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
