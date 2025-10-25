import React from 'react'
import CreateItemForm from '../components/forms/CreateItemForm';

export default function CreateItem() {
    return (
        <div className='flex flex-col justify-start px-6 py-8 mx-auto'>

            <h1 className="mt-5 text-[2rem] font-bold leading-tight tracking-tight text-[#0A236D]">
                Create Item Offer
            </h1>
            <CreateItemForm />
        </div >
    )
}
