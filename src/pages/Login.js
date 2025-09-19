import React from 'react'
import { Link } from 'react-router-dom';

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
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="name@gmail.com"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500"
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#3B82F6] hover:bg-primary-700 focus:ring-4 focus:outline-none 
                       focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Don’t have an account yet?{" "}
            <Link to="/register" className="font-medium text-[#3B82F6] hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>

  )
}
