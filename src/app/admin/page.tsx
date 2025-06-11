"use client";
import { AuthContext } from '@/components/AuthProvider';
import { UserView } from '@/utils/models/users/userView';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
export default function Admin() {
    const router = useRouter();
    const [usersList, setUsersList] = useState<UserView[] | null>(null);
    let auth = useContext(AuthContext);
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
        const fetchUsersList = async () => {
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
                router.replace("/");
            }
        };
        fetchUsersList();
    }, [auth.userData]);
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
                            <td>Account type</td>
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
                                    <td>{user.accountType}</td>
                                    <td>{user.accountNumber}</td>
                                    <td className='flex justify-between'>
                                        <input type="button" value="Deposit" className='bg-green-700 px-4 m-2 hover:cursor-pointer hover:bg-green-800' />
                                        <input type="button" value="Withdrawl" className='bg-red-700 px-4 m-2 hover:cursor-pointer hover:bg-red-800' /> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
