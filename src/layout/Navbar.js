import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';


export default function Navbar({ hideContent }) {
  return (
    <div>

<nav className="relative bg-[#0A236D] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
  <div className=" px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* Mobile menu button */}
        <button
          type="button"
          className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
        >
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            className="size-6"
          >
            <path
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-between h-16 px-4">
        <div className="flex shrink-0">
            <Link to="/">
          <img src={logo} alt="Your Company" className="h-8 w-auto" />
        </Link>
      </div>
      {!hideContent && (
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
            >
            
              Home
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
            >
              Account
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white"
            >
              Categories
            </a>
            <Link to="/login" className="rounded-md bg-[#3B82F6] px-3 py-2 text-sm font-medium text-white">
                Log in
            </Link>
          </div>
        </div>
      )}
      </div>
      {!hideContent && (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button
          type="button"
          className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            className="size-6"
          >
            <path
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      )}
    </div>
  </div>
</nav>



    </div>
  )
}
