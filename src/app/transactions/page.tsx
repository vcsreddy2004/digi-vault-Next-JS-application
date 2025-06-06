"use client";
import { TransactionView } from '@/utils/models/transaction/transactionView';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Transactions() {
  const [transactionsData, setTransactionsData] = useState<TransactionView[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${url}/api/users/transactions-list?pages=1`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });

        if (res.ok) {
          const data = await res.json();
          setTransactionsData(data);
        } else {
          router.push("/");
        }
      } catch (err) {
        router.push("/");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="bg-gray-700 h-screen pt-12">
      <div className="dark:bg-gray-800 bg-blue-300 w-2/3 m-auto">
        <div className='dark:bg-gray-900 bg-blue-400 p-3 text-3xl'>
          Transaction History
        </div>
        <div className='p-3'>
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
                  <td>{transaction.type == "transfer"? transaction.type.toUpperCase()+" to "+transaction.toAccount : " made " + transaction.type }</td>
                  <td className={transaction.type === "deposit" ? "text-green-600" : "text-red-600"}>

                    ${transaction.amount}
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
