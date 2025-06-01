"use client";
import React, { useState } from 'react';

export default function Navbar() {
  const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
  return (
    <div className="dark:bg-neutral-900 bg-gray-200 border-b-1 border-neutral-700">
      <div className="flex justify-between items-center md:hidden">   
        <div className='text-2xl p-3'>
          Digi Vault
        </div>
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
        <div className='p-2'><a href="/">Home</a></div>
        <div className='p-2'><a href="/transactions">Transactions</a></div>
        <div className='p-2'><a href="/transfer">Transfer</a></div>
        <div className='p-2'><a href="/register">Register</a></div>
        <div className='p-2'><a href="/login">Login</a></div>
      </div>

      <div className="hidden md:flex justify-between items-center">
        <div className='text-2xl p-3'>Digi Vault</div>
        <div className='flex gap-5'>
          <div><a href="/">Home</a></div>
          <div><a href="/transactions">Transactions</a></div>
          <div><a href="/transfer">Transfer</a></div>
        </div>
        <div className='flex gap-5 p-3'>
          <div><a href="/register">Register</a></div>
          <div><a href="/login">Login</a></div>
        </div>
      </div>
    </div>
  );
}
