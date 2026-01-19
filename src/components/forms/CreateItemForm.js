import React, { useState } from 'react'
import { Hint } from '@progress/kendo-react-labels';
import { createItem } from '../../services/ItemService';

export default function CreateItem() {
    const [item, setItem] = useState({
        name: '',
        description: '',
        conditions: '',
        category: '',
        price: '',
        image: null,
        imagePreview: null
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setItem({
                ...item,
                image: file,
                imagePreview: URL.createObjectURL(file),
            });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);

        let itemData;
        let hasImage = false;

        if (item.image) {
            hasImage = true;
            itemData = new FormData();
            itemData.append("name", item.name);
            itemData.append("description", item.description);
            itemData.append("conditions", item.conditions);
            itemData.append("category", item.category.toUpperCase());
            itemData.append("price", item.price);
            itemData.append("image", item.image);
        } else {
            itemData = {
                name: item.name,
                description: item.description,
                conditions: item.conditions,
                category: item.category.toUpperCase(),
                price: item.price
            };
        }

        const { success, data, errorMessages = [] } = await createItem(itemData, hasImage);

        if(success) {
            alert("Item Created Successfully!");
        } else {
            setErrors(errorMessages || []);
        }

        setLoading(false);
    };

    const categories = [
        'Education',
        'Technology',
        'Transport',
        'Furniture',
        'Clothes',
        'Sport',
        'Other'
    ];

    return (
        <form onSubmit={(e) => onSubmit(e)} className="space-y-4 md:space-y-6">
            <div className='flex gap-[5rem] mt-[3.5rem] justify-center'>

                <div className='w-[32rem] h-[16rem]'>
                    {item.imagePreview ? (
                        <label
                            htmlFor='image'
                        >
                            <img
                                src={item.imagePreview}
                                alt="Preview"
                                className="w-full h-full max-h-[15rem] object-contain rounded-lg"
                            />
                        </label>
                    ) : (
                        <label
                            htmlFor='image'
                            className='flex flex-col items-center justify-center w-full h-full bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition'
                        >
                            <i className="fa fa-folder text-[3.5rem] text-[#3B82F6]"></i>
                            <span className="text-gray-500 text-sm">Click to upload image</span>
                        </label>
                    )}
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        required
                        onChange={(e) => handleImageChange(e)}
                        className="hidden"
                    />
                </div>


                <div className='w-[30rem]'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="name" className="text-gray-900">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Bike..."
                            required
                            value={item.name}
                            onChange={(e) => handleChange(e)}
                            className="text-[#0A236D] text-[1.8rem] mt-[-1rem] italic placeholder:text-gray-500 placeholder:text-[1.8rem] rounded-lg block w-full p-1.5"
                        />
                    </div>

                    <div className='border border-[#0A236D] rounded-lg'>
                        <div className='mt-2 mb-5 px-5'>
                            <label htmlFor="conditions" className="block mb-2 text-sm font-medium text-left text-gray-900">
                                Rental Conditions
                            </label>
                            <textarea
                                type="text"
                                name="conditions"
                                id="conditions"
                                placeholder="Minimum age.."
                                required
                                maxLength={60}
                                rows={3}
                                value={item.conditions}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const lines = value.split('\n');
                                    if (lines.length <= 3) {
                                        handleChange(e);
                                    }
                                }
                                }
                                className="border border-gray-200 text-gray-900 rounded-lg block h-[5.4rem] w-full p-2.5"
                            />
                            <Hint direction='end' className="self-end text-[0.8rem] text-right">
                                {item.conditions.length} / {60}
                            </Hint>
                        </div>


                        <div className='flex gap-5 mb-2'>
                            <div className='flex items-center w-1/2'>
                                <label htmlFor="category" className="ml-5 block w-1/3 text-sm font-medium text-gray-900">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    required
                                    value={item.category}
                                    onChange={(e) => handleChange(e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-2/3 p-1 py-2"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex items-center w-1/2 gap-x-1'>
                                <label htmlFor="price" className="w-1.5/3 block text-sm font-medium text-gray-900">
                                    Price per Day (€)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="12"
                                    required
                                    value={item.price}
                                    onChange={(e) => handleChange(e)}
                                    className="text-[#0A236D] placeholder:text-[#0A236D] text-[1.4rem] text-center border border-gray-300 rounded-lg focus:ring-[#3B82F6] block w-1/3 p-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div >

            <div className='flex gap-5 justify-center'>
                <div className='flex flex-col mt-5 w-[67rem]'>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 text-left">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Sport Bike..."
                        required
                        rows={4}
                        maxLength={200}
                        value={item.description}
                        onChange={(e) => {
                            const value = e.target.value;
                            const lines = value.split('\n');
                            if (lines.length <= 4) {
                                handleChange(e);
                            }
                        }
                        }
                        className="bg-gray-50 border border-gray-100 text-gray-900 rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block p-2.5 h-32 w-full"
                    />
                    <Hint direction='end' className="self-end">
                        {item.description.length} / {200}
                    </Hint>
                </div>


            </div>

            <div className='flex justify-center'>
                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-2 w-[13rem] h-[2.8rem] text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3B82F6] hover:bg-blue-700'} 
              focus:ring-4 focus:outline-none focus:ring-[#3B82F6]`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Creating...
                        </div>
                    ) : (
                        'Add New Offer'
                    )}
                </button>
            </div>
            {
                errors.length > 0 && (
                    <div className="mb-4">
                        {errors.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm">{error}</p>
                        ))}
                    </div>
                )
            }
        </form >
    )
}