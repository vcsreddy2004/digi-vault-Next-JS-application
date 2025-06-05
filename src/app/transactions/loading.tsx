export default function Transactions() {
  return (
    <div className="bg-gray-700 h-screen pt-12">
      <div className="dark:bg-gray-800 bg-blue-300 w-2/3 m-auto">
        <div className='dark:bg-gray-900 bg-blue-400 p-3 text-3xl'>
          Transaction History
        </div>
        <div className='p-3'>
          <table className="dark:bg-gray-800 bg-blue-300 w-full text-center shadow-lg table-fixed animate-pulse">
            <thead className="dark:bg-gray-900 bg-blue-400 text-2xl">
              <tr>
                <td>
                  <div className="h-12 w-full bg-blue-400 dark:bg-gray-800 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-12 w-full bg-blue-400 dark:bg-gray-800 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-12 w-full bg-blue-400 dark:bg-gray-800 rounded animate-pulse mx-auto"></div>
                </td>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-700 texl-xl">
              <tr>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-10 w-full bg-blue-300 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
