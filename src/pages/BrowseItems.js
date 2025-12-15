import { useEffect, useState } from 'react'
import { ItemCard } from '../components/cards/ItemCard';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/forms/SearchBar';
import { searchItems } from '../services/ItemService';
import FiltersModal from '../components/modals/FiltersModal';

export default function BrowseItems() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const categoryUrl = params.get("category") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    query: search,
    category: categoryUrl,
    minPrice: '',
    maxPrice: '',
    startDate: '',
    endDate: '',
    page: 0,
    size: 10
  });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setErrors([]);

      const { success, data, errorMessages = [] } = await searchItems(filters);

      if (success) {
        setItems(data.content);
        setTotalPages(data.totalPages);
      } else {
        setErrors(errorMessages || []);
      }

      setLoading(false);
    }

    fetchItems();
  }, [filters]);

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, query, page: 0 }))
  };

  const handleApplyFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 0 }));
    setOpen(false);
  }

  return (
    <div className="p-4 mt-5 ml-5">
      <div className='mt-5 flex items-center gap-5 max-w-md' >
        <div className='flex-1'>
          <SearchBar initialValue={search} onSearch={handleSearch} />
        </div>
        <button
          onClick={() => setOpen(true)}
          className='text-gray-500 p-1.5 bg-gray-200 rounded-md inline-flex items-center justify-center'>
          <i className="fa fa-filter"></i>
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2">
          {/* Spinner */}
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Saving...
        </div>
      )}

      {errors.length > 0 && (
        <div className="mb-4">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">{error}</p>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <p className="mt-4 ml-2 text-left text-gray-500">No items found.</p>
      )}

      {items.length > 0 && (
        <div>
          <div className="mt-10 ml-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemCard key={item.name} item={item} />
            ))}
          </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={filters.page === 0}
          onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {filters.page + 1} of {totalPages}</span>

        <button
          disabled={filters.page + 1 >= totalPages}
          onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </div>
  )}

      <FiltersModal
        open={open}
        onClose={() => setOpen(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />

    </div>
  )
}

