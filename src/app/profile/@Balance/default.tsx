import React from 'react'

export default function Balance(props:{balance:number}) {
    return (
        <div className='dark:bg-gray-800 dark:shadow-none shadow-lg dark:border-none border-1 border-neutral-500/30 md:col-span-2 col-span-3 flex flex-col gap-4 items-center justify-center'>
            <div className='text-3xl'>
                Current Balance
            </div>  
            <div className='text-3xl text-green-500'>
                ${props.balance}
            </div>
        </div>
    );
}
