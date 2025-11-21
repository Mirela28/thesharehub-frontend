import { useState } from 'react'

export default function FiltersModal({ open, onClose,onApply }) {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!open) return null;

  const handleApply = () => {
    onApply({ 
      category: category || null, 
      minPrice: minPrice || null, 
      maxPrice: maxPrice || null, 
      startDate: startDate || null, 
      endDate: endDate || null 
    })
    onClose();
  }

  return (
    <div onClick={onClose}
      className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-all'>

      <div
        onClick={(e) => e.stopPropagation()}
        className='relative bg-white rounded-lg shadow-lg p-6 w-80 max-w-md'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-semibold'>
          X
        </button>

        <div className='mt-6 space-y-3'>
          <div className='text-center w-56'>
            <label className='block text-sm font-medium'>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full border p-2 rounded'
            >
              <option value="">All</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Transport">Transport</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothes">Clothes</option>
              <option value="Sport">Sport</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className='flex gap-2'>
            <input 
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className='w-1/2 border p-2 rounded'
            />
            <input 
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='w-1/2 border p-2 rounded'
            />
          </div>

           <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-1/2 border p-2 rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-1/2 border p-2 rounded"
            />
          </div>

          <button
            onClick={handleApply}
            className="mt- bg-[#3B82F6] text-white w-full py-2 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>

        </div>
      </div>
    </div>

  )
}
