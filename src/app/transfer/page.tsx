"use client";
import { TransactionView } from '@/utils/models/transaction/transactionView';
import React, { useState } from 'react'
import { ToWords } from 'to-words'
export default function Transfer() {
  const toWords = new ToWords({localeCode:"en-US"});
  const [transactionDetails,setTransactionDetails] = useState<TransactionView>({} as TransactionView);
  const [confirmAccountNumber, setConfirmAccountNumber] = useState(0);
  const [amountInWords,setAmountInWords] = useState("");
  const [errorMSG,setErrorMSG] = useState("");
  const [successMSG,setSuccessMSG] = useState("");
  const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const words = toWords.convert(value, { currency: true });
    setAmountInWords(words ? words : "");
    setTransactionDetails(prev => ({
      ...prev,
      amount: value
    }));
    setErrorMSG("");
    setSuccessMSG("");
  }
  const updateAccountNo = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTransactionDetails(prev=>({
      ...prev,
      toAccount:Number(e.target.value),
    }));
    setErrorMSG("");
    setSuccessMSG("");
  }
  const transfer = async () => {
    if(transactionDetails.toAccount === confirmAccountNumber) {
      try { 
        const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${URL}/api/users/transfer`,{
          method:"PATCH",
          headers: {
            "Content-Type": "application/json", 
          },
          body:JSON.stringify(transactionDetails),  
          credentials:"include",
        });
        if(res.ok) {
          const data = await res.json();
          setSuccessMSG("Transaction Successfull");
          setTransactionDetails({} as TransactionView);
          setConfirmAccountNumber(0);
          setAmountInWords("");
          setErrorMSG("");
        }
        else {
          const error = await res.json();
          setErrorMSG(error.errorMessage);  
        }
      }
      catch(err) {
        if (err instanceof Error) {
          setErrorMSG(err.message);
        }
        else {
          setErrorMSG("An error occurred");
        }
      }
    }
    else {
      setErrorMSG("Account number and confirm account number must be same")
    }
  }
  return (
    <div className="bg-gray-700 h-screen pt-12"> 
      <div className={`${errorMSG==""? 'hidden':'block'} bg-red-600/30 md:w-1/2 w-full text-center text-rose-600 top-[10%] md:left-[25%] animate-bounce m-auto`}>
        {errorMSG}  
      </div>
      <div className={`${successMSG==""? 'hidden':'block'} bg-green-600/30 md:w-1/2 w-full text-center text-white top-[10%] md:left-[25%] animate-bounce m-auto`}>
        {successMSG}  
      </div>
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
            <span className='mx-2'>To User Account Number</span>
            <input type="number" name="toAccount" onChange={updateAccountNo} className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:outline-rose-500 focus:border-rose-700 focus:outline-1 focus:shadow-gray-900 caret-rose-600 m-2' />
            <span className='mx-2 '>Confirm Account Number</span>
            <input type="number" name="confirmToAccount" onChange={e => setConfirmAccountNumber(Number(e.target.value))} className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span className='mx-2 '>Amount</span>
            <input type="number" name="amount" onChange={updateAmount} className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span>{amountInWords}</span>
            <input type="button" value="Transfer" onClick={transfer} className='bg-red-700 mx-12 hover:cursor-pointer animate duration-300 m-5 hover:bg-red-950 hover:scale-110' />
          </div>
        </div>  
      </div>    
    </div>
  )
}
