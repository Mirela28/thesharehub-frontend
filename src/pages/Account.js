import React, { useState } from 'react'
import account from '../assets/account.png';
import UpdateAccountForm from '../components/forms/UpdateAccountForm';
import { Link } from 'react-router-dom';

export default function Account() {
  const [items, setItems] = useState([]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <p className="mt-10 text-[2.3rem] font-bold text-center text-[#0A236D] font-inter">
            My Account
        </p>
      <div className="mt-2 gap-4">
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
        <UpdateAccountForm />
      </div>

      <div className='w-full'>
      <div className='flex justify-start'>
        <h3 className='mt-20 ml-[5.5rem] text-[1.8rem] text-left font-bold text-[#0A236D] font-inter'>My Offers</h3>
      </div>

      <div className='flex justify-start'>
      {items.length > 0 ? (
        <div>
          Items
          </div>
      ) : (
        <div>
          <p className='mt-10 mb-10 ml-[5.5rem] text-gray-400'>You dont have any items.</p>
          </div>
      )}
      </div>

      <Link
      to="/createitem">
      <div className='flex justify-start'>
        <i className="fa fa-plus-circle mb-10 ml-[5.5rem] text-[3.5rem] text-[#3B82F6]"></i>
      </div>
      </Link>
      </div>
    </div>
  )
}
