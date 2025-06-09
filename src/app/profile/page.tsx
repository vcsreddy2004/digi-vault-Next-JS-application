"use client";
import { AuthContext } from '@/components/AuthProvider';
import React, { useContext } from 'react'

export default function Profile() {
    let auth = useContext(AuthContext);
    return (
        <>
            <div className="grid grid-cols-3 gap-3 w-1/2 m-auto mt-12">
                <div className="dark:bg-gray-800 row-span-2 col-span-1 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-1/2 fill-none stroke-gray-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <div className='dark:bg-gray-800 col-span-2'>
                    <div className="grid grid-cols-4 gap-3 m-3">
                        <div className="bg-gray-900 p-2">
                            Name
                        </div>
                        <div className="bg-gray-700 col-span-3 p-2">
                            {auth.userData.firstName + " " + auth.userData.lastName}
                        </div>
                        <div className="bg-gray-900 p-2">
                            Email
                        </div>
                        <div className="bg-gray-700 col-span-3 p-2">
                            {auth.userData.email}
                        </div>
                        <div className="bg-gray-900 p-2">
                            Account Type
                        </div>
                        <div className="bg-gray-700 col-span-3 p-2">
                            {auth.userData.accountType}
                        </div><div className="bg-gray-900 p-2">
                            Account Number
                        </div>
                        <div className="bg-gray-700 col-span-3 p-2">
                            {auth.userData.accountNumber}
                        </div>
                    </div>
                </div>
                <div className='dark:bg-gray-800 col-span-2 flex flex-col items-center justify-center'>
                    <div className='text-3xl'>
                        Current Balance
                    </div>
                    <div className='text-3xl'>
                        ${auth.userData.amount}
                    </div>
                </div>
            </div>
        </>
    )
}
