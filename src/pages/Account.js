import { useState } from 'react'
import account from '../assets/account.png';
import UpdateAccountForm from '../components/forms/UpdateAccountForm';
import { Link } from 'react-router-dom';

export default function Account() {
  const [myOffers, setMyOffers] = useState([]);
  const [myRents, setMyRents] = useState([]);
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

        <div>
          <div className='flex justify-start'>
            {myOffers.length > 0 ? (
              <div>
          // Render list of offers here
              </div>
            ) : (
              <div>
                <p className='mt-5 mb-5 ml-[5.5rem] text-gray-400'>You dont have any offers.</p>
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

        <div className='flex justify-start'>
          <h3 className='mt-5 ml-[5.5rem] text-[1.8rem] text-left font-bold text-[#0A236D] font-inter'>My Rents</h3>
        </div>

        <div>
          <div className='flex justify-start'>
            {myRents.length > 0 ? (
              <div>
          // Render list of rents here
              </div>
            ) : (
              <div>
                <p className='mt-5 mb-10 ml-[5.5rem] text-gray-400'>You dont have any rents. <Link to='/categories' className='text-[#3B82F6] hover:underline'><span className="underline">Search for something</span></Link></p>
              </div>
            )}
          </div>

          <div className="flex justify-start ml-[5.5rem] mt-2">
          </div>
        </div>

      </div>
    </div>
  )
}
