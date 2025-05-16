import { useState } from "react"
import { LoginCredentials } from "../types/auth"
import { Link, useNavigate } from "react-router-dom"
import api from '../api/auth'
import { useAuthStore } from "../store/authStore"

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ 
    email: "", 
    password: "" 
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', credentials)
      localStorage.setItem('token', res.data.token)
      useAuthStore.getState().setToken(res.data.token)
      navigate('/')
    } catch {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="w-screen h-screen px-5 py-5 bg-[#f1f1f1] flex items-center justify-center">
      <div className="w-[400px] h-[400px] bg-white flex flex-col items-center rounded-md py-10">
        <h1 className="text-2xl font-bold">Login</h1>
        <form className="flex flex-col gap-5 mt-5 w-full px-16" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input 
              className="focus:outline-none border border-gray-300 px-2 py-2 rounded-sm" 
              type="email" 
              name="email" 
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="focus:outline-none border border-gray-300 px-2 py-2 rounded-sm"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-[#1d4ed8] px-2 py-2 rounded-md text-white hover:bg-[#3b82f6] transition duration-300 ease-in-out cursor-pointer"
            type="submit"
          >
            Login
          </button>
          <hr className="w-full border border-gray-300" />
          <p 
            className="text-center"
          >
            Don't have an account? 
            <Link 
              to="/register"
              className="text-[#1d4ed8] cursor-pointer"
            >
              {" "}Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
