import SearchBar from '../components/forms/SearchBar';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getTop3RentedItems } from '../services/ItemService';
import { ItemCard } from '../components/cards/ItemCard';

export default function Home() {
  const navigate = useNavigate();
  const [topRentedItems, setTopRentedItems] = useState([]);

  useEffect(() => {
    loadTopRentedItems();
  }, []);

  const loadTopRentedItems = async () => {
    const { success, data, errorMessages = [] } = await getTop3RentedItems();

    if (success) {
      setTopRentedItems(data.content);
    } else {
      console.error("Error loading top rented items:", errorMessages);
    }
  };

  const handleSearch = (query) => {
    navigate(`/browseitems?search=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <p className="mt-40 text-[2.5rem] font-bold text-center text-[#0A236D] font-inter">
        All your rental needs in <span className="underline">one</span> place
      </p>
      <div className='mt-10'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <p className="mt-40 ml-[5.5rem] text-[1.8rem] text-left font-bold text-[#0A236D] font-inter">
        Top Rentals
      </p>
      <div className="max-w-full px-20 mx-auto py-5">

        <div className="w-full px-2">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">

            {topRentedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </div>


    </div>
  )
}
