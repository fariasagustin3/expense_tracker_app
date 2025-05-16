import { useState } from "react"
import { RegisterCredentials } from "../types/auth"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/auth"
import { useAuthStore } from "../store/authStore"

const RegisterPage: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({ 
    firstName: "",
    lastName: "",
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
      const res = await api.post('/auth/register', credentials)
      useAuthStore.getState().setToken(res.data.token)
      navigate('/')
    } catch (error) {
      console.log('error', error)
      alert("Something went wrong")
    }
  }

  return (
    <div className="w-screen h-screen px-5 py-5 bg-[#f1f1f1] flex items-center justify-center">
      <div className="w-[400px] h-[600px] bg-white flex flex-col items-center rounded-md py-10">
        <h1 className="text-2xl font-bold">Register</h1>
        <form className="flex flex-col gap-5 mt-5 w-full px-16" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <input 
              className="focus:outline-none border border-gray-300 px-2 py-2 rounded-sm" 
              type="text" 
              name="firstName" 
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <input 
              className="focus:outline-none border border-gray-300 px-2 py-2 rounded-sm" 
              type="text" 
              name="lastName" 
              id="lastName"
              onChange={handleChange}
            />
          </div>
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
            Register
          </button>
          <hr className="w-full border border-gray-300" />
          <p 
            className="text-center"
          >
            Already have an account? 
            <Link 
              to="/login"
              className="text-[#1d4ed8] cursor-pointer"
            >
              {" "}Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
