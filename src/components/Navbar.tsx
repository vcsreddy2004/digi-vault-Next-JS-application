"use client";
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';

export default function Navbar() {
  const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
  const auth = useContext(AuthContext);
  useEffect(()=>{
    auth.getData();
  },[]);
  return (
    <div className="dark:bg-neutral-800 bg-gray-200 border-b-1 border-neutral-700">
      <div className="flex justify-between items-center md:hidden">
        <div className='text-2xl p-3'>Digi Vault</div>
        <div className='md:hidden'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsMobileDropdownVisible(!isMobileDropdownVisible)}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 m-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
      </div>

      <div className={`${isMobileDropdownVisible ? 'flex' : 'hidden'} flex-col p-3`} id='mobile-dropdown'>
        <div className='p-2'><Link href="/">Home</Link></div>
        <div className='p-2'><Link href="/transactions">Transaction History</Link></div>
        <div className='p-2'><Link href="/transfer">Transfer</Link></div>
        {Object.keys(auth.userData).length > 0 ? (
          <div className='p-2'><Link href="/logout">Logout</Link></div>
        ) : (
          <>
            <div className='p-2'><Link href="/register">Register</Link></div>
            <div className='p-2'><Link href="/login">Login</Link></div>
          </>
        )}
      </div>

      <div className="hidden md:flex justify-between items-center">
        <div className='text-2xl p-3'>Digi Vault</div>
        <div className='flex gap-5'>
          <div><Link href="/">Home</Link></div>
          <div><Link href="/transactions">Transaction History</Link></div>
          <div><Link href="/transfer">Transfer</Link></div>
        </div>
        <div className='flex gap-5 p-3'>
          {Object.keys(auth.userData).length > 0 ? (
            <div className='p-2'><Link href="/logout">Logout</Link></div>
          ) : (
            <>
              <div className='p-2'><Link href="/register">Register</Link></div>
              <div className='p-2'><Link href="/login">Login</Link></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
