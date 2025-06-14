"use client";
import React, { useState } from 'react'
import { ToWords } from 'to-words'
export default function Transfer() {
  const toWords = new ToWords({localeCode:"en-US"});
  const [amountInWords,setAmountInWords] = useState("");
  const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const words = toWords.convert(value, { currency: true });
    setAmountInWords(words ? words : "");
  }
  return (
    <div className="bg-gray-700 h-screen pt-12">
      <div className="dark:bg-gray-800 w-1/2 m-auto flex shadow-lg">
        <div className='dark:bg-gray-900 w-1/2 bg-gray-100 flex justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-1/2 text-gray-800 fill-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
        <div className='w-1/2'>
          <div className='dark:bg-gray-900 p-3'>
            Transfer
          </div>
          <div className='flex flex-col'>
            <span className='mx-2 '>To User Account Number</span>
            <input type="text" name="toAccount" className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:outline-rose-500 focus:border-rose-700 focus:outline-1 focus:shadow-gray-900 caret-rose-600 m-2' />
            <span className='mx-2 '>Confirm Account Number</span>
            <input type="text" name="confirmToAccount" className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span className='mx-2 '>Amount</span>
            <input type="number" name="amount" onChange={updateAmount} className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span>{amountInWords}</span>
            <input type="button" value="Transfer" className='bg-red-700 mx-12 hover:cursor-pointer animate duration-300 m-5 hover:bg-red-950 hover:scale-110' />
          </div>
        </div>  
      </div>    
    </div>
  )
}
