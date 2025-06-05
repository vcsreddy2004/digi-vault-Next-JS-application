export default function Register() {
  return (
    <div className='dark:bg-neutral-900 h-screen pt-12'>
      <div className="dark:bg-gray-800 w-1/2 m-auto flex shadow-lg">
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
            <input type="text" name="firstName" className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span className='mx-2 '>Last Name</span>
            <input type="text" name="lastName" className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span className='mx-2 '>Email</span>
            <input type="text" name="email" className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span className='mx-2'>Password</span>
            <input type="password" name="password" className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <span className='mx-2'>Confirm Password</span>
            <input type="password" name="confirmPassword" className='border border-black dark:border-gray-500 dark:focus:shadow-lg focus:shadow-gray-900 focus:outline-rose-500 focus:border-rose-700 focus:outline-1 caret-rose-600 m-2' />
            <input type="button" value="Register  " className='bg-green-700/40 mx-12 hover:cursor-pointer animate duration-300 m-5 hover:bg-green-900/30 hover:scale-120' />
          </div>
        </div>  
      </div>    
    </div>
  )
}
