import { useState, useEffect } from 'react';
import account from '../assets/account.png';
import { getUserById } from '../services/UserService';
import { Link } from 'react-router-dom';

export default function AccountPage() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = window.location.pathname.split('/').pop();
            const result = await getUserById(userId);
            if (result.success) {
                setUser(result.data);
            } else {
                setUser(null);
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-gray-500">Loading user account...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-red-500">User not found</div>
            </div>
        );
    }

    return (
        <div className="w-full px-20 min-h-screen flex flex-col items-center">
            <p className="mt-10 text-[2.3rem] font-bold text-center text-[#0A236D] font-inter">
                {user.name}
            </p>
            <div className="mt-2 gap-4">
                <img
                    src={account}
                    alt="Profile"
                    className="h-[8rem] w-[8rem] rounded-full object-cover"
                />
            </div>
            <div className="mt-10 w-full px-20 space-y-4 md:space-y-6 border border-1 border-gray-200 rounded-md p-3">
                <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    <div className="flex items-center gap-4">
                        <h2 htmlFor="name" className="block text-sm font-medium text-gray-900 w-24 text-right">
                            Name
                        </h2>
                        <p className="text-left bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5">{user.name}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <h2 htmlFor="name" className="block text-sm font-medium text-gray-900 w-24 text-right">
                            Username
                        </h2>
                        <p className="text-left bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5">{user.username}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <h2 htmlFor="name" className="block text-sm font-medium text-gray-900 w-24 text-right">
                            Email
                        </h2>
                        <p className="text-left bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5">{user.email}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <h2 htmlFor="name" className="block text-sm font-medium text-gray-900 w-24 text-right">
                            Phone
                        </h2>
                        <p className="text-left bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5">{user.phone}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <h2 htmlFor="name" className="block text-sm font-medium text-gray-900 w-24 text-right">
                            City
                        </h2>
                        <p className="text-left bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5">{user.city}</p>
                    </div>

                </div>
                
            </div>
            <div className="px-20 mt-8 flex ">
                <Link
                    to="/requests"
                >
                <button 
                    className="rounded-md bg-[#3B82F6] px-4 py-2 text-m font-medium text-white"
                >
                    Back
                </button>
                </Link>
            </div>
        </div>
        
    )
}
