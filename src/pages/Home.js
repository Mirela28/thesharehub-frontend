import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers=async()=>{
        const result = await axios.get("http://localhost:8080/getusers");
        console.log(result.data);
    }


  return (
    <div>
        <p className="mt-40 text-[2.5rem] font-bold text-center text-[#0A236D] font-inter">
            All your rental needs in <span className="underline">one</span> place
        </p>


        <form className="mt-10 max-w-lg mx-auto">
  <div className="flex">
    <label
      htmlFor="search-dropdown"
      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Your Email
    </label>

    {/* Dropdown button */}
    <button
      id="dropdown-button"
      type="button"
      className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-[#828282] bg-[#F3F4F6] border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
    >
      All categories
      <svg
        className="w-2.5 h-2.5 ms-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    {/* Dropdown menu */}
    <div
      id="dropdown"
      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
    >
      <ul
        className="py-2 text-sm text-gray-700 "
        aria-labelledby="dropdown-button"
      >
        {["Mockups", "Templates", "Design", "Logos"].map((item) => (
          <li key={item}>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Search input */}
    <div className="relative w-full">
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full z-20 text-sm text-[#828282] bg-[#F3F4F6] rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Search for textbooks, bikes, etc..."
        required
      />
      <button
        type="submit"
        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#3B82F6] rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  </div>
</form>



        <p className="mt-40 ml-[5.5rem] text-[1.8rem] text-left font-bold text-[#0A236D] font-inter">
            Top Rentals
        </p>
        <div className="max-w-full px-20 mx-auto py-12">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
    
    {/* Card 1 */}
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Card 1"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Card 1 Title</h2>
        <p className="text-gray-600 text-sm">Card 1 description goes here.</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Card 2"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Card 2 Title</h2>
        <p className="text-gray-600 text-sm">Card 2 description goes here.</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Card 3"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Card 3 Title</h2>
        <p className="text-gray-600 text-sm">Card 3 description goes here.</p>
      </div>
    </div>

  </div>
</div>


    </div>
  )
}
