import React from 'react';
export default function LoadingUserData() {
    return (
        <>
            <div className='dark:bg-gray-800 dark:shadow-none shadow-xl dark:border-none border-1 border-neutral-500/30 col-span-2 hidden md:block p-4 rounded-lg'>
                <div className="grid grid-cols-4 gap-3 m-3 animate-pulse">
                    <div className="dark:bg-gray-900 p-2 rounded">
                        Name
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2 animate-pulse rounded"></div>

                    <div className="dark:bg-gray-900 p-2 rounded">
                        Email
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2 animate-pulse rounded"></div>

                    <div className="dark:bg-gray-900 p-2 rounded">
                        Account Type
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2 animate-pulse rounded"></div>

                    <div className="dark:bg-gray-900 p-2 rounded">
                        Account Number
                    </div>
                    <div className="dark:bg-gray-700 col-span-3 p-2 animate-pulse rounded"></div>
                </div>
            </div>
            <div className="dark:bg-gray-800 dark:shadow-none shadow-lg dark:border-none border-1 border-neutral-500/30 col-span-3 block md:hidden p-4 rounded-lg">
                <div className="flex flex-col gap-3 m-3 animate-pulse">
                    <div>
                        <div className="dark:bg-gray-900 p-2 rounded">
                            Name
                        </div>
                        <div className="dark:bg-gray-700 p-2 animate-pulse mt-1 rounded"></div>     
                    </div>
                    <div>
                        <div className="dark:bg-gray-900 p-2 rounded">
                            Email
                        </div>
                        <div className="dark:bg-gray-700 p-2 animate-pulse mt-1 rounded"></div>
                    </div>
                    <div>
                        <div className="dark:bg-gray-900 p-2 rounded">
                            Account Type
                        </div>
                        <div className="dark:bg-gray-700 p-2 animate-pulse mt-1 rounded"></div>
                    </div>
                    <div>
                        <div className="dark:bg-gray-900 p-2 rounded">
                            Account Number
                        </div>
                        <div className="dark:bg-gray-700 p-2 animate-pulse mt-1 rounded"></div>
                    </div>
                </div>
            </div>
        </>
    );
}