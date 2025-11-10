import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ initialValue = "", onSearch }) {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setInput(initialValue);
    }, [initialValue]);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = input.trim();
        if (!input) return;
        onSearch(query);
        navigate(`/browseitems?search=${encodeURIComponent(query)}`);
    }

    return (
        <form onSubmit={handleSearch} className='flex max-w-lg mx-auto'>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for textbooks, bikes, etc."
                className='flex-1 p-2 border rounded-l-lg'
            />
            <button
                type="submit"
                className='p-2 bg-[#3B82F6] text-white rounded-r-lg'
            >
                Search
            </button>
        </form>

    )
}
