import React, { useEffect, useState } from 'react'
import account from '../assets/account.png';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Account() {
  const { user, setUser } = useUser();
  const [credentials, setCredentials] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    city: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (user) {
      setCredentials({
        name: user.name ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        city: user.city ?? ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/users/update', credentials, { withCredentials: true });
      if (response.status === 200) {
        alert("Account updated successfully");
        setUser(response.data);
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

  const cities = [
    'Amsterdam',
    'Rotterdam',
    'The Hague',
    'Utrecht',
    'Eindhoven',
    'Maastricht',
  ];

  const hasChanges = user && credentials
    ? Object.keys(credentials).some(
      (key) => credentials[key] !== (user[key])
    )
    : false;

  useEffect(() => {
    if(!hasChanges) {
      setErrors([]);
    }
  }, [hasChanges]);

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate])

  if (user === undefined) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="mt-20 gap-4">
        <img
          src={account}
          alt="Profile"
          className="h-[8rem] w-[8rem] rounded-full object-cover"
        />
        <button className="text-sm border border-1 border-gray-400 p-1 px-2">
          Edit Picture
        </button>
      </div>
      <div className="mt-10 w-full px-20">

        <form onSubmit={(e) => onSubmit(e)} className="space-y-4 md:space-y-6 border border-1 border-gray-200 rounded-md p-3">
          <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="flex items-center gap-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 w-24 text-right">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John"
                required
                value={credentials.name}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-900 w-24 text-right">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="userame"
                placeholder="john389"
                required
                value={credentials.username}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 w-24 text-right">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@gmail.com"
                required
                value={credentials.email}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 w-24 text-right">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+31 6 12345678"
                required
                value={credentials.phone}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-900 w-24 text-right">
                City
              </label>
              <select
                name="city"
                id="city"
                required
                value={credentials.city}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <button
              type="submit"
              disabled={loading || !hasChanges}
              className={`w-[8rem] text-white font-medium rounded-md text-sm px-5 py-3 text-center
              ${loading || !hasChanges ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3B82F6] hover:bg-blue-700'} 
              focus:ring-4 focus:outline-none focus:ring-[#3B82F6]`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  {/* Spinner */}
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>


          {errors.length > 0 && hasChanges && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
