import React from 'react';
import { useGetPurchaseQuery, useDeletePurchaseMutation, TPurchase } from './PurchaseApi';
import { Toaster, toast } from 'sonner';
// import { useCreatePaymentsMutation } from '../payments/PaymentsApi';

const Purchase: React.FC = () => {
  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;
  const contact_phone = userDetails?.contact_phone;
  const token = userDetails?.token;
  const [loadingPurchaseId, setLoadingPurchaseId] = React.useState<number | null>(null);
  const [processingPurchaseId, setProcessingPurchaseId] = React.useState<number | null>(null);

  // Add detailed debugging logs
  console.log('Raw userDetails from localStorage:', userDetailsString);
  console.log('Parsed userDetails:', userDetails);
  console.log('Token value:', token);
  console.log('Token type:', typeof token);
  console.log('Token length:', token?.length);

  const { data: purchases, error, isLoading, isError, refetch } = useGetPurchaseQuery();
  // const [createPayments] = useCreatePaymentsMutation();
  const [deletePurchase, { data: deleteMsg }] = useDeletePurchaseMutation();

  const handleUpdate = async (purchase: TPurchase) => {
    // Enhanced token validation
    if (!token) {
      toast.error('No authentication token found. Please login again.');
      return;
    }

    if (typeof token !== 'string' || token.length < 10) {
      toast.error('Invalid token format. Please login again.');
      return;
    }

    if (!user_id || !contact_phone) {
      toast.error('Missing user information. Please login again.');
      return;
    }

    if (!purchase.purchase_id || !purchase.total_amount) {
      toast.error('Invalid purchase details');
      return;
    }

    setProcessingPurchaseId(purchase.purchase_id);
    try {
      // Log the request details
      const requestBody = {
        purchase_id: purchase.purchase_id,
        user_id: user_id,
        amount: Number(purchase.total_amount),
        status: 'pending',
        phone_number: contact_phone
      };
      console.log('Request body:', requestBody);
      console.log('Authorization header:', token);

      // Handle M-Pesa payment
      const response = await fetch('https://unified-property-1.onrender.com/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      
      if (response.ok) {
        toast.success('M-Pesa payment initiated! Please check your phone for the STK push.');
        refetch();
      } else {
        if (response.status === 401) {
          toast.error('Authentication failed. Please login again.');
          // Clear invalid token and redirect to login
          localStorage.removeItem('userDetails');
          window.location.href = '/login';
        } else {
          toast.error(data.error || 'Failed to initiate M-Pesa payment');
        }
      }
    } catch (err: any) {
      console.error('Error creating payment:', err);
      
      if (err.message === 'Failed to fetch') {
        toast.error('Cannot connect to the server. Please make sure the backend server is running.');
      } else if (err.status === 401) {
        toast.error('Session expired. Please login again');
      } else if (err.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error('Failed to initiate payment. Please try again.');
      }
    } finally {
      setProcessingPurchaseId(null);
    }
  };

  const handleDelete = async (purchase_id: number) => {
    setLoadingPurchaseId(purchase_id);
    try {
      await deletePurchase(purchase_id);
      toast.success(deleteMsg?.msg || 'Purchase deleted successfully');
      refetch();
    } finally {
      setLoadingPurchaseId(null);
    }
  };

  const myPurchases = purchases?.filter((purchase: TPurchase) => purchase.user_id === user_id);

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
      <div className="overflow-x-auto bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">My Purchases</h1>
        <table className="table-auto border-collapse w-full bg-gray-400 text-white border border-white">
          <thead>
            <tr>
              <th className="text-white border-white px-4 py-2">Purchase Date</th>
              <th className="text-white border-white px-4 py-2">Total Amount</th>
              <th className="text-white border-white px-4 py-2">Purchase Status</th>
              <th className="text-white border-white px-4 py-2">Property Type</th>
              <th className="text-white border-white px-4 py-2">Property ID</th>
              <th className="text-white border-white px-4 py-2">Options</th>
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
              myPurchases?.map((purchase: TPurchase) => (
                <tr key={purchase.purchase_id}>
                  <td className="border border-white px-4 py-2">{purchase.purchase_date}</td>
                  <td className="border border-white px-4 py-2">ksh{purchase.total_amount}</td>
                  <td className="border border-white px-4 py-2">{purchase.purchase_status}</td>
                  <td className="border border-white px-4 py-2">{purchase.property_type}</td>
                  <td className="border border-white px-4 py-2">{purchase.property_id}</td>
                  <td className="space-x-2 border border-white px-4 py-2">
                    <button 
                      className={`bg-red-600 rounded-b-md p-0.5 ${loadingPurchaseId === purchase.purchase_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleDelete(purchase.purchase_id)}
                      disabled={loadingPurchaseId === purchase.purchase_id || processingPurchaseId === purchase.purchase_id}
                    >
                      {loadingPurchaseId === purchase.purchase_id ? 'Cancelling...' : 'Cancel'}
                    </button>
                    {purchase.purchase_status !== 'confirmed' && (
                      <button 
                        className={`bg-green-400 rounded-b-md p-0.5 min-w-12 mt-1.5 ${processingPurchaseId === purchase.purchase_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleUpdate(purchase)}
                        disabled={processingPurchaseId === purchase.purchase_id || loadingPurchaseId === purchase.purchase_id}
                      >
                        {processingPurchaseId === purchase.purchase_id ? 'Processing...' : 'Pay'}
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
                {myPurchases ? `{myPurchases.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Purchase;