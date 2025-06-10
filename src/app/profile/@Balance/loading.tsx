import React from 'react';

export default function Loading() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
            <div className='dark:bg-gray-800 dark:shadow-none shadow-lg dark:border-none border-1 border-neutral-500/30 md:col-span-2 col-span-3 flex flex-col gap-4 items-center justify-center p-8 rounded-lg animate-pulse'>
                <div className='text-3xl text-gray-700 dark:text-gray-300'>
                    Loading Balance...
                </div>
                <div className='w-16 h-16 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin'></div>
            </div>
        </div>
    );
}