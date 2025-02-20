import React from 'react';
import { useGetPurchaseQuery, useDeletePurchaseMutation, TPurchase } from './PurchaseApi';
import { Toaster, toast } from 'sonner';
import { useCreatePaymentsMutation } from '../payments/PaymentsApi';

const purchases: React.FC = () => {
  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  const { data: purchases, error, isLoading, isError, refetch } = useGetPurchaseQuery();
  const [createCheckout] = useCreatePaymentsMutation();
  const [deletepurchase, { data: deleteMsg }] = useDeletePurchaseMutation();

  const handleUpdate = async (purchase: TPurchase) => {
    try {
      const { data } = await createCheckout({ purchase_id: purchase.purchase_id, amount: Number(purchase.total_amount) });
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Checkout url is not given');
        toast.error('provide checkout url');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Error creating checkout session');
    }
  };

  const Mypurchases = purchases?.filter((purchase: TPurchase) => purchase.user_id === user_id);

  const handleDelete = async (purchase_id: number) => {
    await deletepurchase(purchase_id);
    toast.success(deleteMsg?.msg || 'purchase deleted successfully');
    refetch();
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">My purchases</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">purchase Date</th>
              <th className="text-white">Total Amount</th>
              <th className="text-white">purchase Status</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Updated At</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7}>Error: {error?.message || 'An error occurred'}</td>
              </tr>
            ) : (
              Mypurchases?.map((purchase: TPurchase) => (
                <tr key={purchase.purchase_id}>
                  <td>{purchase.purchase_date}</td>
                  <td>${purchase.total_amount}</td>
                  <td>{purchase.purchase_status}</td>
                  <td>{purchase.created_at}</td>
                  <td>{purchase.updated_at}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(purchase.purchase_id)}>
                      cancel
                    </button>
                    {purchase.purchase_status !== 'confirmed' && (
                      <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(purchase)}>
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-white" colSpan={7}>
                {Mypurchases ? `${Mypurchases.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default purchases;
