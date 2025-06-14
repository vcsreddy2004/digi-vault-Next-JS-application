"use client";
import { AuthContext } from '@/components/AuthProvider';
import { UserView } from '@/utils/models/users/userView';
import { useRouter } from 'next/navigation';
import React, { useCallback, useContext, useEffect, useState } from 'react';
interface TransactionType  {
    account:number,
    type:"withdrawal" | "deposit",
    amount:number
}
export default function Admin() {
    const router = useRouter();
    const [usersList, setUsersList] = useState<UserView[] | null>(null);
    const auth = useContext(AuthContext);
    const [transactionBoxVisible,setTransactionBoxVisible] = useState(false);
    const [transactionData,settTransactionData] = useState<TransactionType>({} as TransactionType);
    const [errorMessage,setErrorMessage] = useState("");
    const fetchUsersList = useCallback(async () => {
        try {
            const url = process.env.NEXT_PUBLIC_BACKEND_URL;
            const res = await fetch(`${url}/api/admins/users-list`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                setUsersList(data);
            }
        } catch (err) {
            console.log(err);
            router.replace("/");
        }
    },[router]);
    useEffect(() => {
        if (!auth.userData || !auth.userData.accountType) {
            return;
        }
        if(Object.keys(auth.userData).length <=0) {
            router.replace("/");
        }
        if (auth.userData.accountType !== "admin") {
            router.replace("/");
            return;
        }
        fetchUsersList();
    }, [auth.userData,router]);
    const openTransactionBox = (e: React.MouseEvent<HTMLInputElement>, user: UserView) => {
        const target = e.target as HTMLInputElement;
        settTransactionData((prev) => ({   
            ...prev, 
            type: target.name as "withdrawal" | "deposit",
            account: user.accountNumber
        }));
        setTransactionBoxVisible(true);
    }
    const transfer = async () => {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL;
        try {
            if(url) {
                const res = await fetch(`${url}/api/admins/transaction`,{
                    method:"PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body:JSON.stringify(transactionData),
                })
                if(res.ok) {
                    fetchUsersList();
                    setErrorMessage("");
                    setTransactionBoxVisible(false);
                    settTransactionData({} as TransactionType);
                }
                else {
                    const error = await res.json();
                    setErrorMessage(error.errorMessage);
                }  
            }
        }
        catch(err) {
            alert(err);
        }
    }
    return (
        <div className="bg-gray-700 h-screen pt-12">
            <div className="dark:bg-gray-800 bg-blue-300 w-[95%] m-auto">
                <div className='dark:bg-gray-900 bg-blue-400 p-3 text-3xl'>
                    Users List
                </div>
                <div className='p-3'>
                    <table className="dark:bg-gray-800 bg-blue-300 w-full text-center shadow-lg table-auto  ">
                        <thead className="dark:bg-gray-900 bg-blue-400 text-2xl">
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>User Name</td>
                            <td>Amount</td>
                            <td>Account number</td>
                            <td>Deposit / Withdrawl</td>
                        </tr>
                        </thead>
                        <tbody className="dark:bg-gray-700 text-xl">
                            {usersList && usersList.map((user: UserView) => (
                                <tr key={user.userName}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.amount}</td>
                                    <td>{user.accountNumber}</td>
                                    <td className='flex justify-between'>
                                        <input type="button" value="Deposit" name='deposit' onClick={(e) => openTransactionBox(e,user)} className='bg-green-700 px-4 m-2 hover:cursor-pointer hover:bg-green-800' />
                                        <input type="button" value="Withdrawl" name='withdrawal' onClick={(e) => openTransactionBox(e,user)} className='bg-red-700 px-4 m-2 hover:cursor-pointer hover:bg-red-800' /> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`${transactionBoxVisible? 'fixed': 'hidden'} top-[20%] w-1/4 ml-[30%]`}>
                        <div className="bg-gray-800 w-full text-2xl flex justify-between p-5">
                            <span>Make transaction to</span>
                            <span onClick={() => setTransactionBoxVisible(false)} className='hover:cursor-pointer'>X</span>
                        </div>
                        <div className="bg-gray-600 p-5 flex flex-col items-center">
                            {errorMessage !== ""? (<div className='bg-red-700 w-full text-2xl text-center'>{errorMessage}</div>) : (<></>)}
                            <span className='self-baseline'>Account Number</span>
                            <input type="number" disabled value={transactionData.account} className='w-full border border-black dark:border-gray-800 dark:focus:shadow-lg focus:outline-rose-500 focus:border-rose-700 focus:outline-1 focus:shadow-gray-900 caret-rose-600 m-2 hover:cursor-not-allowed' name="account" />
                            <span className='self-baseline'>Type</span>
                            <input type="text" disabled value={transactionData.type} className='w-full border border-black dark:border-gray-800 dark:focus:shadow-lg focus:outline-rose-500 focus:border-rose-700 focus:outline-1 focus:shadow-gray-900 caret-rose-600 m-2 hover:cursor-not-allowed' name="type" />
                            <span className='self-baseline'>Amount</span>
                            <input type="number" onChange={(e)=>{settTransactionData(prev=>({...prev,amount:Number(e.target.value)}))}} className='w-full border border-black dark:border-gray-800 dark:focus:shadow-lg focus:outline-rose-500 focus:border-rose-700 focus:outline-1 focus:shadow-gray-900 caret-rose-600 m-2' name="amount" />
                            <input type="button" value={transactionData.type} onClick={()=>transfer()} className='bg-green-700/40 w-full hover:cursor-pointer animate duration-300 hover:bg-green-900/40 hover:scale-110' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
