import React from 'react'

interface ButtonProps {
  label: string
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button
      className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out cursor-pointer"
    >
      {label}
    </button>
  )
}

export default Button
