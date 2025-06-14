"use client";
import { AuthContext } from '@/components/AuthProvider';
import { TransactionView } from '@/utils/models/transaction/transactionView';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function Transactions() {
  const [transactionsData, setTransactionsData] = useState<TransactionView[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const pageNo:number = Number(params.get("page")) || 1;
  const [endOfPage,setEndOfPage] = useState(false);
  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${url}/api/users/transactions-list?pages=${pageNo}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setTransactionsData(data);
          const nextRes = await fetch(`${url}/api/users/transactions-list?pages=${pageNo + 1}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
          });
          if (nextRes.ok) {
            const nextData = await nextRes.json();
            setEndOfPage(!nextData || nextData.length === 0);
          } else {
            setEndOfPage(true);
          }
        } else {
          router.push("/");
        }
      } catch (err) {
        console.log(err);
        router.push("/");
      }
    };

    fetchTransactions();
  }, [pageNo,router]);


  return (
    <div className="bg-gray-700 h-screen pt-12">
      <div className="dark:bg-gray-800 bg-blue-300 w-2/3 m-auto">
        <div className='dark:bg-gray-900 bg-blue-400 p-3 text-3xl'>
          Transaction History
        </div>
        <div className='p-3'>
          <div className='text-2xl'>
            Current Balance = <span className='text-green-600'>${auth.userData.amount}</span>
          </div>
          <table className="dark:bg-gray-800 bg-blue-300 w-full text-center shadow-lg table-fixed">
            <thead className="dark:bg-gray-900 bg-blue-400 text-2xl">
              <tr>
                <td>Date</td>
                <td>Narration</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-700 text-xl">
              {transactionsData.map((transaction, idx) => (
                <tr key={idx}>
                  <td>{new Date(transaction.timeStamp).toLocaleString()}</td>
                  <td>{transaction.type == "transfer"? transaction.type.toUpperCase()+" to "+transaction.toAccount : " made " + transaction.type.toUpperCase() }</td>
                  <td className={transaction.type === "deposit" ? "text-green-600" : "text-red-600"}>

                    ${transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center m-5">
            <input type="button" value="Prev" disabled={pageNo <= 1} onClick={() => router.push(`/transactions?page=${pageNo - 1}`)} className={`${pageNo===1? "hover:cursor-no-drop bg-green-950" : "hover:cursor-pointer hover:bg-green-800"} bg-green-600 px-5 py-1`} />
            <input type="button" value="Next" disabled={endOfPage} onClick={() => router.push(`/transactions?page=${pageNo+1}`)} className={`${endOfPage? "hover:cursor-no-drop bg-green-950" : "hover:cursor-pointer hover:bg-green-800"} bg-green-600 px-5 py-1`} />
          </div>
        </div>
      </div>
    </div>
  );
}
