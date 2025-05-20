import React, { useState } from "react";
import TextInput from "../components/forms/TextInput";
import SubmitButton from "../components/forms/SubmitButton";
import { Link } from "wouter";

interface Credentials {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: ""
  });

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
      <div className="w-1/4 h-2/3 bg-white rounded-md shadow-md py-4 px-10">
        <h1 className="text-2xl text-gray-800 font-semibold mb-4 text-center">Login</h1>
        <p className="text-xs text-gray-600 text-center">Make the difference on your finances</p>
        <div className="h-[1px] bg-gray-200 my-5"></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <SubmitButton text="Login" />
        </form>
        <div className="h-[1px] bg-gray-200 my-5"></div>
        <p
          className="text-xs text-gray-600 text-center"
        >
          Don't have an account?
          <Link 
            href="/register"
            className="text-blue-500 font-semibold"
          >
            {" "}Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;