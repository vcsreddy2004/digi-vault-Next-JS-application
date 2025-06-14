"use client";
import { UserView } from "@/utils/models/users/userView"
import { useRouter } from "next/navigation";
import { useState } from "react"
export default function Register() {
  const [userData,setUserData] = useState<UserView>({} as UserView);
  const [confirmPassword,setConfirmPassword] = useState<string>("");
  const [errors,setErrors] = useState<{[key:string]:boolean}>({});
  const [errorBackend,setErrorBackend] = useState("");
  const router = useRouter();
  const updateUserData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData((prev: UserView) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev)=>({
      ...prev,
      [e.target.name]:false,
    }));
  }
  const updateConfirmPassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value); 
    setErrors((prev)=>({
      ...prev,
      [e.target.name]:false,
    }))
  }
  const registerUser = async () => {
    const currentErrors:{[key:string]:boolean} = {};
    switch (true) {
      case !userData.firstName || userData.firstName === "":currentErrors.firstName = true;
      case !userData.lastName || userData.lastName === "":currentErrors.lastName = true;
      case !userData.email || userData.email === "":currentErrors.email = true;
      case !userData.userName || userData.userName === "":currentErrors.userName = true;
      case !userData.password || userData.password === "":currentErrors.password = true;
      case confirmPassword === "":currentErrors.confirmPassword = true;
      case userData.password && confirmPassword && userData.password !== confirmPassword:currentErrors.password = true; currentErrors.confirmPassword = true;
      default: break;
    }
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length === 0) {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (url) {
      try {
        const res = await fetch(`${url}/api/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (!res.ok) {
          const error = await res.json();
          setErrorBackend(error.errorMessage);
        }
        else {
          router.push("/login");
        }
      } catch (err) {
        setErrorBackend(err instanceof Error? err.message : typeof err === "string"? err : "An error occurred");
      }
    } else {
      setErrorBackend("Something went wrong. Our team has been notified and is working on a fix.");
    }
  }
  }
  return (
    <div className='dark:bg-neutral-900 h-screen pt-12'>
      <div className={`${errorBackend==""? 'hidden':'block'} bg-red-600/30 md:w-1/2 w-full text-center text-rose-600 top-[10%] md:left-[25%] animate-bounce m-auto`}>
        {errorBackend}  
      </div>
      <div className="dark:bg-gray-800 md:w-1/2 m-auto flex shadow-lg">
        <div className='dark:bg-gray-900 w-1/2 bg-gray-100 flex justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-1/2 text-gray-800 fill-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
        <div className='w-1/2'>
          <div className='dark:bg-gray-900 p-3'>
            Register
          </div>
          <div className='flex flex-col'>
            <span className='mx-2 '>First Name</span>
            <input type="text" name="firstName" onChange={updateUserData} className={`border ${errors.firstName? 'border-red-800' : 'border-black dark:border-gray-500'} dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2`} />
            <span className='mx-2 '>Last Name</span>
            <input type="text" name="lastName" onChange={updateUserData} className={`border ${errors.lastName? 'border-red-800' : 'border-black dark:border-gray-500'} dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2`} />
            <span className='mx-2 '>Email</span>
            <input type="text" name="email" onChange={updateUserData} className={`border ${errors.email? 'border-red-800' : 'border-black dark:border-gray-500'} dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2`} />
            <span className='mx-2 '>Username</span>
            <input type="text" name="userName" onChange={updateUserData} className={`border ${errors.userName? 'border-red-800' : 'border-black dark:border-gray-500'} dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2`} />
            <span className='mx-2'>Password</span>
            <input type="password" name="password" onChange={updateUserData} className={`border ${errors.password? 'border-red-800' : 'border-black dark:border-gray-500'} dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2`} />
            <span className='mx-2'>Confirm Password</span>
            <input type="password" name="confirmPassword" onChange={updateConfirmPassword} className={`border ${errors.confirmPassword? 'border-red-800' : 'border-black dark:border-gray-500'} dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2`} />
            <input type="button" value="Register" onClick={registerUser} className='bg-green-700/40 mx-12 hover:cursor-pointer animate duration-300 m-5 hover:bg-green-900/30 hover:scale-110' />
          </div>
        </div>  
      </div>    
    </div>
  )
}

       