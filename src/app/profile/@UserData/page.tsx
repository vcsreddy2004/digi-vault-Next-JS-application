import { UserView } from '@/utils/models/users/userView';
import React from 'react'
interface UserDataProps {
    userData:UserView
}
export default function UserData({ userData }: UserDataProps) {
    if (!userData || !userData.firstName) return null;
    return (
        <>
            <div className='dark:bg-gray-800 dark:shadow-none shadow-xl dark:border-none border-1 border-neutral-500/30 col-span-2 hidden md:block'>
                <div className="grid grid-cols-4 gap-3 m-3">
                    <div className="dark:bg-gray-900 p-2">
                        Name
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2">
                        {userData.firstName + " " + userData.lastName}
                    </div>
                    <div className="dark:bg-gray-900 p-2">
                        Email
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2">
                        {userData.email}
                    </div>
                    <div className="dark:bg-gray-900 p-2">
                        Account Type
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2">
                        {userData.accountType}
                    </div><div className="dark:bg-gray-900 p-2">
                        Account Number
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2">
                        {userData.accountNumber}
                    </div>
                </div>
            </div>
            <div className="dark:bg-gray-800 dark:shadow-none shadow-lg dark:border-none border-1 border-neutral-500/30 col-span-3 block md:hidden">
                <div className="flex flex-col gap-3 m-3">
                    <div>
                        <div className="dark:bg-gray-900 p-2">
                            Name
                        </div>
                        <div className="dark:bg-gray-700 p-2">
                            {userData.firstName + " " + userData.lastName}
                        </div>
                    </div>
                    <div>
                        <div className="dark:bg-gray-900 p-2">
                            Email
                        </div>
                        <div className="dark:bg-gray-700 p-2">
                            {userData.email}
                        </div>
                    </div>
                    <div>
                        <div className="dark:bg-gray-900 p-2">
                            Account Type
                        </div>
                        <div className="dark:bg-gray-700 p-2">
                            {userData.accountType}
                        </div>
                    </div>
                    <div>
                        <div className="dark:bg-gray-900 p-2">
                            Account Number
                        </div>
                        <div className="dark:bg-gray-700 p-2">
                            {userData.accountNumber}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}