import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import account from '../../assets/account.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import { logoutUser } from '../../services/UserService'

export default function Navbar({ hideContent }) {
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { succes } = await logoutUser();

    if (succes) {
      alert("Logged out")
      setUser(null);
      navigate('/');
    } else {
      setUser(null);
    }

    setLoading(false);
    setDropdownOpen(false);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

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

                    {user === undefined ? (
                      <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                    ) : user ? (
                      <div className="relative">
                        <button
                          onClick={toggleDropdown}
                          className="flex items-center focus:outline-none"
                        >
                          <img
                            src={account}
                            alt="Profile"
                            className={`h-10 w-10 rounded-full object-cover hover:opacity-80 ${dropdownOpen ? 'border-2 border-white' : ''
                              } hover:opacity-80`}
                          />
                        </button>

                        {dropdownOpen && (
                          <div className="absolute left-1/2 -translate-x-1/2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                            <Link
                              to="/account"
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-2 text-[#0A236D] hover:bg-gray-100"
                            >
                              Profile Overview
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full px-4 py-2 text-[#0A236D] hover:bg-gray-100"
                            >
                              Log Out
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="rounded-md bg-[#3B82F6] px-3 py-2 text-sm font-medium text-white">
                        Log in
                      </Link>
                    )}

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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>



    </div>
  )
}
