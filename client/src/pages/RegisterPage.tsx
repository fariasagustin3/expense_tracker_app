import React, { useState } from 'react'
import TextInput from '../components/forms/TextInput'
import SubmitButton from '../components/forms/SubmitButton'
import { Link } from 'wouter'

interface Credentials {
  firstName: string
  lastName: string
  email: string
  password: string
}

const RegisterPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('credentials', credentials)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
      <div className="w-1/4 h-4/5 bg-white rounded-md shadow-md py-4 px-10">
        <h1 className="text-2xl text-gray-800 font-semibold mb-4 text-center">Register</h1>
        <p className="text-xs text-gray-600 text-center">Take control of your personal finances is the first step to get a healthy life</p>
        <div className="h-[1px] bg-gray-200 my-5"></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            label="First name"
            placeholder="Enter your first name"
            onChange={handleChange}
            type="text"
            name="firstName"
            value={credentials.firstName}
          />
          <TextInput
            label="Last name"
            placeholder="Enter your last name"
            onChange={handleChange}
            type="text"
            name="lastName"
            value={credentials.lastName}
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            onChange={handleChange}
            type="email"
            name="email"
            value={credentials.email}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            onChange={handleChange}
            type="password"
            name="password"
            value={credentials.password}
          />
          <SubmitButton text="Register" />
        </form>
        <div className="h-[1px] bg-gray-200 my-5"></div>
        <p
          className="text-xs text-gray-600 text-center"
        >
          Already have an account?
          <Link
            href="/login"
            className="text-blue-500 font-semibold"
          >
            {" "}Login
          </Link>
        </p>
      </div>
    </div >
  )
}

export default RegisterPage