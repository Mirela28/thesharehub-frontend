import React, { useState, useEffect } from 'react';
import SearchBar from '../components/forms/SearchBar';

export default function Home() {

  return (
    <div>
        <p className="mt-40 text-[2.5rem] font-bold text-center text-[#0A236D] font-inter">
            All your rental needs in <span className="underline">one</span> place
        </p>
        <div className='mt-10'>
        <SearchBar />
        </div>
        <p className="mt-40 ml-[5.5rem] text-[1.8rem] text-left font-bold text-[#0A236D] font-inter">
            Top Rentals
        </p>
        <div className="max-w-full px-20 mx-auto py-12">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
    
    {/* Card 1
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        //src="https://via.placeholder.com/400x200"
        src=""
        alt="Card 1"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Card 1 Title</h2>
        <p className="text-gray-600 text-sm">Card 1 description goes here.</p>
      </div>
    </div>

     Card 2 
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        //src="https://via.placeholder.com/400x200"
        src=""
        alt="Card 2"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Card 2 Title</h2>
        <p className="text-gray-600 text-sm">Card 2 description goes here.</p>
      </div>
    </div>

    Card 3 
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        //src="https://via.placeholder.com/400x200"
        src=""
        alt="Card 3"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Card 3 Title</h2>
        <p className="text-gray-600 text-sm">Card 3 description goes here.</p>
      </div>
    </div> */}

  </div>
</div>


    </div>
  )
}
