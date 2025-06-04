import React from 'react'
const load = (time:number) => {
    return new Promise((resolve)=>setTimeout(() => {
        resolve("done");
    }, time));
}
export default async function Transactions() {
  await load(4000);
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
                <td>
                  Date
                </td>
                <td>
                  Narration
                </td>
                <td>
                  Amount
                </td>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-700 texl-xl">
              <tr>
                <td>
                  Now
                </td>
                <td>
                  TRANSFER to vennackfkggkgmbm fger egrjipn gi0svnjl wgi0rsv
                </td>
                <td>
                  $30
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
