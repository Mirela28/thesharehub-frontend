import { useEffect, useState } from 'react'
import account from '../assets/account.png';
import UpdateAccountForm from '../components/forms/UpdateAccountForm';
import { Link } from 'react-router-dom';
import { getUserOfferedItems, getUserRentedItems } from '../services/ItemService';
import { ItemCard } from '../components/cards/ItemCard';

export default function Account() {
  const [myOffersPage, setMyOffersPage] = useState([]);
  const [myRentsPage, setMyRentsPage] = useState([]);

  const [offersLoading, setOffersLoading] = useState(false);
  const [rentsLoading, setRentsLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const [offersPagination, setOffersPagination] = useState(
    { page: 0, size: 6 });
  const [rentsPagination, setRentsPagination] = useState(
    { page: 0, size: 6 });

  useEffect(() => {
    loadOffers();
  }, [offersPagination]);

  useEffect(() => {
    loadRents();
  }, [rentsPagination]);

  const loadOffers = async () => {
    setOffersLoading(true);

    const { success, data, errorMessages = [] } = await getUserOfferedItems(offersPagination);

    if (success) {
      setMyOffersPage(data)
    } else {
      setErrors(errorMessages || []);
    }

    setOffersLoading(false);
  }

  const loadRents = async () => {
    setRentsLoading(true);

    const { success, data, errorMessages = [] } = await getUserRentedItems(rentsPagination);

    if (success) {
      setMyRentsPage(data)
    } else {
      setErrors(errorMessages || []);
    }

    setRentsLoading(false);
  };

  const renderItemCards = (page) => {
    return (
      <div className="mt-6 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        {page.content.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  }

  const renderPagination = (page, onChange) => {
    return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={page.number === 0}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onChange(page.number - 1)}
      >
        Previous
      </button>

      <span>Page {page.number + 1} / {page.totalPages}</span>

      <button
        disabled={page.number === page.totalPages - 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onChange(page.number + 1)}
      >
        Next
      </button>
    </div>
    );
  }

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
          <div className='w-full px-[5.5rem]'>
            {!offersLoading && myOffersPage.content?.length > 0 ? (
              <div>
                {renderItemCards(myOffersPage)}

                {renderPagination(myOffersPage, page => {
                  setOffersPagination(prev => ({ ...prev, page }));
                })}
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
            {!rentsLoading && myRentsPage.content?.length > 0 ? (
              <div>
                {renderItemCards(myRentsPage)}

                {renderPagination(myRentsPage, page => {
                  setRentsPagination(prev => ({ ...prev, page }));
                })}
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
