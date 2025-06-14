"use client";
import { AuthContext } from '@/components/AuthProvider';
import React, { useContext } from 'react'
import Balance from './@Balance/page';
import UserData from './@UserData/page';
export default function Profile() {
    const auth = useContext(AuthContext);
    return (
        <>
            <div className="grid md:grid-cols-3 gird-cols-1 gap-3 w-1/2 m-auto mt-12">
                <div className="dark:bg-gray-800 dark:shadow-none shadow-md dark:border-none border-1 border-neutral-500/30 row-span-2 md:col-span-1 col-span-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-1/2 fill-none stroke-gray-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <Balance balance={auth.userData.amount} />
                <UserData userData={auth.userData} />
            </div>
        </>
    )
}
