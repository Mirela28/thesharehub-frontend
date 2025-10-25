import React from 'react';
import LoginForm from '../components/forms/LoginForm'

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
      <p className="mt-10 mb-10 text-[1.5rem] font-bold text-center text-[#0A236D] font-inter">
        <i>Welcome back to The Share Hub — your community for smarter rentals </i>
      </p>
      <div className="w-full bg-white rounded-lg shadow border border-[#3D4083] md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className=" text-xl font-bold leading-tight tracking-tight text-gray-900] md:text-2xl">
            Sign in to your account
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>

  )
}
