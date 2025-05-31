"use client";
import React from 'react'
export default function Navbar() {
    let navbarDropDownVisibulity = () => {
        let mobileDropdown = document.querySelector("#mobile-dropdown");
        if(mobileDropdown?.classList.contains("flex")) {
            mobileDropdown.classList.remove("flex");
            mobileDropdown.classList.add("hidden");
        }
        else {
            if (mobileDropdown) {
                mobileDropdown.classList.add("flex");
                mobileDropdown.classList.remove("hidden");
            }
        }
    }
    return (
        <div className="dark:bg-neutral-900 bg-gray-200 border-b-1 border-neutral-700">
            <div className="flex justify-between items-center md:hidden">   
                <div className='text-2xl p-3'>
                    Digi Vault
                </div>
                <div className='md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={navbarDropDownVisibulity} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 m-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </div>
            </div>
            <div className="hidden flex-col p-3" id='mobile-dropdown'>
                <div className='p-2'>
                    Home
                </div>
                <div className='p-2'>
                    Check Balance
                </div>
                <div className='p-2'>
                    Register
                </div>
                <div className='p-2'>
                    Login
                </div>
            </div>
            <div className="hidden md:flex justify-between items-center">
                <div className='text-2xl p-3'>
                    Digi Vault
                </div>
                <div className='flex gap-5'>
                    <div>
                        Home
                    </div>
                    <div>
                        Check Balance
                    </div>
                    <div>
                        Trensfer
                    </div>
                </div>
                <div className='flex gap-5 p-3'>
                    <div>
                        Register
                    </div>
                    <div>
                        Log In
                    </div>
                </div>
            </div>
        </div>
    );
}
