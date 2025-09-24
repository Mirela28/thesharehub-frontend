import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        city: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);

        try{
        const response = await axios.post('http://localhost:8080/users/signup', user);
        if(response.status === 201){
          alert("Registration successful! Please log in.");
          navigate('/login');
        }
        }catch(error){
            if (error.response && error.response.status === 400) {
              setErrors(error.response.data.errors);
            }
            else {
              setErrors(["An unexpected error occurred. Please try again."]);
            }
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

  return (
    <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
      <p className="mt-10 mb-10 text-[1.5rem] font-bold text-center text-[#0A236D] font-inter italic">
        One account, endless rental possibilities
      </p>

      <div className="w-full bg-white rounded-lg shadow border border-[#3D4083] md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#0A236D] md:text-2xl">
            Create an account
          </h1>

          <form onSubmit={(e) => onSubmit(e)} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John"
                required
                value={user.name}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="John389"
                required
                value={user.username}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@gmail.com"
                required
                value={user.email}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+31 6 12345678"
                required
                value={user.phone}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                City
              </label>
              <select
                name ="city"
                id="city"
                required
                value={user.city}
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

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                value={user.password}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                required
                value={user.confirmPassword}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#3B82F6] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-[#3B82F6] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>

            {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          )}

            <p className="text-sm font-light text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#3B82F6] hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
