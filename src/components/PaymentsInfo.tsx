import { useGetPaymentsInfoQuery, TPaymentsInfo } from "../features/payments/PaymentsInfoAPI";

const PaymentsInfo = () => {
  const { data, isLoading, isError } = useGetPaymentsInfoQuery();

  return (
    <div>
      <div className="overflow-x-auto bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className='text-xl my-4'>Payments Data</h1>
        <table className="table-auto border-collapse w-full bg-gray-400 text-white border border-white">
          <thead>
            <tr>
            <th className='text-white border border-white px-4 py-2'>user_id</th>
              <th className='text-white border border-white px-4 py-2'>purchase_id</th>
              <th className='text-white border border-white px-4 py-2'>location_id</th>
              <th className='text-white border border-white px-4 py-2'>total_amount</th>
              <th className='text-white border border-white px-4 py-2'>purchase_status</th>
              <th className='text-white border border-white px-4 py-2'>transaction_id</th>
              <th className='text-white border border-white px-4 py-2'>amount</th>
              <th className='text-white border border-white px-4 py-2'>status</th>
              <th className='text-white border border-white px-4 py-2'>transaction_date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={13}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={13}>Error: {isError?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((payments: TPaymentsInfo) => (
                  <tr key={payments.transaction_id}>
                     {payments.purchase ? (
                      <>
                        <td className="border border-white px-4 py-2">{payments.user.user_id}</td>
                        <td className="border border-white px-4 py-2">{payments.purchase.purchase_id}</td>
                        <td className="border border-white px-4 py-2">{payments.purchase.location_id}</td>
                        <td className="border border-white px-4 py-2">{payments.purchase.total_amount}</td>
                        <td className="border border-white px-4 py-2">{payments.purchase.purchase_status}</td>
                      </>
                    ) : (
                      <>
                        <td className="border border-white px-4 py-2" colSpan={7}>No purchase data</td>
                      </>
                    )}
                    <td className="border border-white px-4 py-2">{payments.transaction_id}</td>
                    <td className="border border-white px-4 py-2">{payments.amount}</td>
                    <td className="border border-white px-4 py-2">{payments.status}</td>
                    <td className="border border-white px-4 py-2">{payments.transaction_date}</td>
                   
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr><td className='text-white' colSpan={13}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PaymentsInfo;