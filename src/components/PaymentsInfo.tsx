import { useGetPaymentsInfoQuery,TPaymentsInfo } from "../features/payments/PaymentsInfoAPI"
const PaymentsInfo = () => {
    const { data, isLoading, isError } = useGetPaymentsInfoQuery();
  return (
    <div>
       <div className="overflow-x-auto  bg-gray-800 text-white rounded-lg p-4 min-h-screen">
        <h1 className='text-xl my-4'>Payments Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'> transaction_id</th>
              <th className='text-white'> amount</th>
              <th className='text-white'>status</th>
              <th className='text-white'>transaction_date</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
              <th className='text-white'>user_id</th>
              <th className='text-white'>booking_id</th>
              <th className='text-white'>location_id</th>
              <th className='text-white'>vehicle_id</th>
              <th className='text-white'>booking_date</th>
              <th className='text-white'>return_date</th>
              <th className='text-white'> total_amount</th>
              <th className='text-white'>booking_status</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
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
                    <td>{payments.amount}</td>
                    <td>{payments.status}</td>
                    <td>{payments.transaction_date}</td>
                    <td>{payments.created_at}</td>
                    <td>{payments.purchase.user_id}</td>
                    <td>{payments.purchase.purchase_id}</td>
                    <td>{payments.purchase.location_id}</td>
                    <td>{payments.purchase.vehicle_id}</td>
                    <td>{payments.purchase.booking_date}</td>
                    <td>{payments.purchase.return_date}</td>
                    <td>{payments.purchase.total_amount}</td>
                    <td>{payments.purchase.status}</td>
                    <td>{payments.purchase.created_at}</td>
                    <td>{payments.purchase.updated_at}</td>
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
