import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getItemById } from '../services/ItemService';
import { createRent,getApprovedRentDates } from '../services/RentService';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../components/forms/Stripe';
import PaymentForm from '../components/forms/PaymentForm';

export default function ItemPost() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [requesting, setRequesting] = useState(false);
    const [message, setMessage] = useState(null);
    const [checked, setChecked] = useState(false);
    const [rentData, setRentData] = useState({
        itemId: item?.id,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
    });

    const { user } = useUser();
    const navigate = useNavigate();
    const [showPayment, setShowPayment] = useState(false);
    const[blockedDates, setBlockedDates] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/");
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

    useEffect(() => {
        if(!item?.id) return;

        const fetchBlockedDates = async () => {
            const result = await getApprovedRentDates(item.id);
            if(result.success) {
                const dates = result.data.map(range => ({
                    start: new Date(range.startDate),
                    end: new Date(range.endDate)
                }));
                setBlockedDates(dates);
            }
        };

        fetchBlockedDates();
    }, [item]);

    const isRangeBlocked = (start, end) => {
        if (!start || !end) return false;

        return blockedDates.some(range =>
            start <= range.end && end >= range.start
        );
    };

    useEffect(() => {
        setRentData({
            itemId: item?.id,
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
        });
    }, [item, startDate, endDate]);

    const rentalDays =
        startDate && endDate
            ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
            : 0;

    const handleRequest = async () => {
        if (!startDate || !endDate) {
            setMessage({ type: "error", text: "Please select a start and end date." });
            return;
        }

        if (!checked) {
            setMessage({ type: "error", text: "You must declare that you meet all conditions." });
            return;
        }

        // if (!user) {
        //     navigate("/");
        //     return;
        // }

        setMessage(null);
        // setShowPayment(true);

        setRequesting(true);

        const { success, data, errorMessages } = await createRent(rentData);

        if (success) {
            alert("Rent Requested Successfully!");
        } else {
            setMessage({ type: "error", text: normalizeError(errorMessages) });
        }

        setRequesting(false);
    };

    const normalizeError = (err) => {
        if (!err) return "Unexpected error";

        if (Array.isArray(err)) return err.join(", ");

        if (typeof err === "string") return err;

        if (err.errors && Array.isArray(err.errors)) return err.errors.join(", ");

        return "Unexpected error";
    };


    const handlePaymentSuccess = async () => {
        setRequesting(true);

        const { success, data, errorMessages } = await createRent(rentData);

        if (success) {
            alert("Rent Requested Successfully!");
            setShowPayment(false);
        } else {
            setMessage({ type: "error", text: normalizeError(errorMessages) });
        }

        setRequesting(false);
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
                    {item.image ? (
                        <img
                            src={`data:image/jpeg;base64,${item.image}`}
                            alt={item.name}
                            className="w-full h-full max-h-[15rem] object-contain rounded-lg shadow"
                        />
                    ) : (
                        <div className='w-full h-full bg-gray-200 rounded-lg shadow flex items-center justify-center'>
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
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
                <div className="flex gap-28 justify-center mt-6 mb-10">
                    <div className="w-[30rem] items-left border border-[#0A236D] rounded-lg p-3 flex flex-col justify-center max-h-[12rem]">
                        <h3 className="text-lg font-semibold text-[#0A236D] ml-5">Owner Info</h3>
                        <div className="flex flex-col gap-2 text-gray-700 text-left ml-5 mt-4">
                            <div><span className="font-semibold text-gray-800">Name:</span> {item.ownerName}</div>
                            <div><span className="font-semibold text-gray-800">Phone:</span> {item.ownerPhone}</div>
                            <div><span className="font-semibold text-gray-800">Email:</span> {item.ownerEmail}</div>
                        </div>
                    </div>

                    <div className='w-[30rem] border border-[#0A236D] rounded-lg p-5'>
                        <h3 className="text-lg font-semibold text-[#0A236D] text-left">
                            Request to Rent
                        </h3>

                        {item.ownerId === user.id ? (
                            <p className="mt-8 text-m italic font-semibold text-gray-700">
                                This is your offer
                            </p>
                        ) : (
                            <div>
                                <div className="flex item-center justify-between mb-4">
                                    <label className='text-sm mt-3 font-semibold text-gray-800'>
                                        Select Rental Dates:
                                    </label>
                                    <div className='flex-col'>
                                        <DatePicker
                                            selectsRange
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={new Date()}
                                            onChange={(update) => {
                                                const [start, end] = update;

                                                if((start && end && isRangeBlocked(start, end))) {
                                                    setMessage({ type: "error", text: "Selected dates overlap with existing approved rentals. Please choose different dates." });
                                                    setDateRange([null, null]);
                                                } else {
                                                    setMessage(null);
                                                    setDateRange(update);
                                                }
                                            }}
                                            placeholderText="No dates selected"
                                            dateFormat="dd/MM/yyyy"
                                            excludeDateIntervals={blockedDates}
                                            calendarClassName="bg-white border border-gray-200 rounded-lg shadow"
                                            dayClassName={(date) =>
                                                startDate && endDate && date >= startDate && date <= endDate
                                                    ? "bg-[#3B82F6] text-white rounded-none"
                                                    : undefined
                                            }
                                            selected={startDate}
                                            className="w-full border border-gray-300 text-center rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        />
                                        {rentalDays > 0 && (
                                            <div className="mt-2 text-sm font-semibold text-gray-800">
                                                Total: <span className="text-[#0A236D]">{rentalDays * item.price} €</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <input
                                        type="checkbox"
                                        id="declare"
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        className="w-4 h-4 text-[#3B82F6] bg-gray-100 border-gray-300 rounded focus:ring-[#3B82F6]"
                                    />
                                    <label htmlFor="declare" className="ml-2 text-sm font-semibold text-gray-800">
                                        I declare that I meet all the rental conditions
                                    </label>
                                </div>

                                <button
                                    onClick={handleRequest}
                                    disabled={requesting || !checked}
                                    className={`mt-4 w-[13rem] h-[2.8rem] text-white font-medium rounded-lg text-sm px-5 py-1.5
                        ${(requesting || !checked)
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#3B82F6] hover:bg-blue-700"}
                        focus:ring-4 focus:outline-none focus:ring-[#3B82F6]`}
                                >
                                    {requesting ? "Sending Request..." : (
                                        <div>
                                            Request to Rent
                                            <br />
                                            <p className='text-[0.8rem]'>(Pay with Stripe)</p>
                                        </div>
                                    )}
                                </button>

                                {/* {showPayment && (
                                    <Elements stripe={stripePromise}>
                                        <PaymentForm
                                            amount={rentalDays * item.price}
                                            onSuccess={handlePaymentSuccess}
                                            onClose={() => setShowPayment(false)}
                                        />
                                    </Elements>
                                )} */}

                                {message && (
                                    <p
                                        className={`text-sm mt-3 ${message.type === "error" ? "text-red-500" : "text-green-600"
                                            }`}
                                    >
                                        {message.text}
                                    </p>
                                )}
                            </div>
                        )}

                    </div>


                </div>

            </div>

        </div >
    )
}