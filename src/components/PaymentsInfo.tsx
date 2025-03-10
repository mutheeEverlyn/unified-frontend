import { useGetPaymentsInfoQuery,TPaymentsInfo } from "../features/payments/PaymentsInfoAPI"
const PaymentsInfo = () => {
    const { data, isLoading, isError } = useGetPaymentsInfoQuery();
  return (
    <div>
       <div className="overflow-x-auto  bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className='text-xl my-4'>Payments Data</h1>
        <table className="table-auto border-collapse  w-full bg-gray-400 text-white border border-white ">
          <thead>
            <tr>
              <th className='text-white border border-white px-4 py-2'> transaction_id</th>
              <th className='text-white border border-white px-4 py-2'> amount</th>
              <th className='text-white border border-white px-4 py-2'>status</th>
              <th className='text-white border border-white px-4 py-2'>transaction_date</th>
              <th className='text-white border border-white px-4 py-2'>created_at</th>
              <th className='text-white border border-white px-4 py-2'>updated_at</th>
              <th className='text-white border border-white px-4 py-2'>user_id</th>
              <th className='text-white border border-white px-4 py-2'>purchase_id</th>
              <th className='text-white border border-white px-4 py-2'>location_id</th>
              <th className='text-white border border-white px-4 py-2'>vehicle_id</th>
              <th className='text-white border border-white px-4 py-2'>land_id</th>
              <th className='text-white border border-white px-4 py-2'>house_id</th>
              <th className='text-white border border-white px-4 py-2'> total_amount</th>
              <th className='text-white border border-white px-4 py-2'>booking_status</th>
              <th className='text-white border border-white px-4 py-2'>created_at</th>
              <th className='text-white border border-white px-4 py-2'>updated_at</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={6}>Error: {isError?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((payments:TPaymentsInfo) => (
                  <tr key={payments.transaction_id}>
                     <td>{payments.transaction_id}</td>
                    <td className="border border-white px-4 py-2">{payments.amount}</td>
                    <td className="border border-white px-4 py-2">{payments.status}</td>
                    <td className="border border-white px-4 py-2">{payments.transaction_date}</td>
                    <td className="border border-white px-4 py-2">{payments.created_at}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.user_id}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.purchase_id}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.location_id}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.vehicle_id}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.land_id}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.house_id}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.total_amount}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.status}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.created_at}</td>
                    <td className="border border-white px-4 py-2">{payments.purchase.updated_at}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr><td className='text-white' colSpan={6}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default PaymentsInfo
