import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setErrors(["Username and password are required"]);
      return;
    }
    setErrors([]);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/users/login', credentials , {withCredentials: true});
      if (response.status === 200) {
        setUser(response.data);
        navigate('/');
        }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      else {
        setErrors(["An unexpected error occurred. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };


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

          <form onSubmit={(e) => onSubmit(e)} className="space-y-4 md:space-y-6" action="#">
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
                placeholder="John389"
                required
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>

            {/* Remember me + forgot password */}
            {/* <div className="flex items-center justify-between">
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
          </div> */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3B82F6] hover:bg-primary-700'} 
              focus:ring-4 focus:outline-none focus:ring-primary-300`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  {/* Spinner */}
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>

            {errors.length > 0 && (
              <div className="mb-4">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-500 text-sm">{error}</p>
                ))}
              </div>
            )}

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
