import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getItemById } from '../services/ItemService';

export default function ItemPost() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [requesting, setRequesting] = useState(false);
    const [message, setMessage] = useState(null);

    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchItem = async () => {
            const itemId = window.location.pathname.split('/').pop();
            const result = await getItemById(itemId);
            if (result.success) {
                setItem(result.data);
            } else {
                setItem(null);
            }
            setLoading(false);
        };
        fetchItem();
    }, []);

    const handleRequest = async () => {
        if (!startDate || !endDate) {
            setMessage({ type: "error", text: "Please select a start and end date." });
            return;
        }

        setRequesting(true);
        setMessage(null);

        // Implement request logic here
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-gray-500">Loading item details...</div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-red-500">Item not found</div>
            </div>
        );
    }

    return (
        <div className="space-y-4 md:space-y-6">
            <div className='flex gap-[5rem] mt-[3.5rem] justify-center'>
                <div className='w-[32rem] h-[16rem]'>
                    <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={item.name}
                        className="w-full h-full max-h-[15rem] object-contain rounded-lg shadow"
                    />
                </div>

                <div className='w-[30rem]'>
                    <h1 className="text-[2rem] text-left font-semibold text-[#0A236D] italic mb-2">
                        {item.name}
                    </h1>

                    <div className='border border-[#0A236D] rounded-lg'>
                        <div className='mt-2 mb-5 px-5'>
                            <h2 className="text-sm text-left font-semibold text-gray-800">
                                Rental Conditions
                            </h2>
                            <p className="text-gray-700 text-left whitespace-pre-line">
                                {item.conditions || "No conditions specified."}
                            </p>
                        </div>

                        <div className='flex gap-6 mb-2 ml-5'>
                            <div className='flex items-center w-1/2'>
                                <span className="text-sm font-semibold text-gray-800">
                                    Category:
                                </span>
                                <span className="text-gray-700 ml-1">{item.category}</span>
                            </div>

                            <div className='flex items-center w-1/2 gap-x-1'>
                                <span className="text-sm font-semibold text-gray-800">
                                    Price per Day:
                                </span>{" "}
                                <span className="text-[#0A236D] font-semibold">
                                    {item.price} €
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className='flex gap-5 justify-center'>
                <div className='flex flex-col w-[67rem]'>
                    <h2 className="block mb-2 text-sm font-semibold text-gray-900 text-left">
                        Description
                    </h2>
                    <div className="bg-gray-50 text-left border border-gray-100 text-gray-900 rounded-lg p-3 min-h-[7rem]">
                        {item.description || "No description provided."}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center space-y-3 mt-6">
                <div className="flex gap-6 justify-center mt-6">
                    <div className="w-[30rem] items-left border border-[#0A236D] rounded-lg p-3 flex flex-col justify-center max-h-[12rem]">
                        <h3 className="text-lg font-semibold text-[#0A236D] mb-2">Owner Info</h3>
                        <div className="flex flex-col gap-2 text-gray-700">
                            <div><span className="font-semibold text-gray-800">Name:</span> {item.ownerName}</div>
                            <div><span className="font-semibold text-gray-800">Phone:</span> {item.ownerPhone}</div>
                            <div><span className="font-semibold text-gray-800">Email:</span> {item.ownerEmail}</div>
                        </div>
                    </div>

                    <div className='w-[25rem]'>
                        <h3 className="text-lg font-semibold text-[#0A236D]">
                            Request to Rent
                        </h3>
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            onChange={(update) => setDateRange(update)}
                            inline
                            calendarClassName="bg-white border border-gray-200 rounded-lg shadow"
                            dayClassName={(date) =>
                                startDate && endDate && date >= startDate && date <= endDate
                                    ? "bg-[#3B82F6] text-white rounded-none"
                                    : undefined
                            }
                            selected={startDate}
                        />

                        <button
                            onClick={handleRequest}
                            disabled={requesting}
                            className={`mt-4 w-[13rem] h-[2.8rem] text-white font-medium rounded-lg text-sm px-5 py-2.5
                        ${requesting ? "bg-gray-400 cursor-not-allowed" : "bg-[#3B82F6] hover:bg-blue-700"}
                        focus:ring-4 focus:outline-none focus:ring-[#3B82F6]`}
                        >
                            {requesting ? "Sending Request..." : "Request to Rent"}
                        </button>
                    </div>
                </div>

                {message && (
                    <p
                        className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-600"
                            }`}
                    >
                        {message.text}
                    </p>
                )}
            </div>

        </div >
    )
}