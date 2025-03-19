import React from 'react';
import { useGetCustomerReviewQuery, useDeleteCustomerReviewMutation } from './CustomerReviewsApi';
import { Toaster, toast } from 'sonner';
import { TCustomerReview } from './CustomerReviewsApi';

const CustomerReviews: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const token = userDetails?.token;
  const { data, error, isLoading, isError } = useGetCustomerReviewQuery(undefined, {
    headers: {
      'Authorization': `${token}`
    }
  });
  const [deleteCustomerReview, { data: deleteMsg }] = useDeleteCustomerReviewMutation();

  const handleDelete = async (review_id: number) => {
    await deleteCustomerReview(review_id);
    toast.success(deleteMsg?.msg || 'Customer review deleted successfully');
  };

  console.log('Customer Reviews Data:', data);

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
        <h1 className='text-xl my-4'>Customer Review Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white border border-white px-4 py-2'>user_id</th>
              <th className='text-white border border-white px-4 py-2'>review_id</th>
              <th className='text-white border border-white px-4 py-2'>rating</th>
              <th className='text-white border border-white px-4 py-2'>comment</th>
              <th className='text-white border border-white px-4 py-2'>created_at</th>
              <th className='text-white border border-white px-4 py-2'>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={6}>Error: {error?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((customerReview: TCustomerReview, index: number) => (
                  <tr key={index}>
                    <td className="border border-white px-4 py-2">{customerReview.user_id}</td>
                    <th className="border border-white px-4 py-2">{customerReview.review_id}</th>
                    <td className="border border-white px-4 py-2">{customerReview.rating}</td>
                    <td className="border border-white px-4 py-2">{customerReview.comment}</td>
                    <td className="border border-white px-4 py-2">{customerReview.created_at}</td>
                    <td className='flex gap-2 border border-white px-4 py-2'>
                      <button className='bg-green-400 rounded p-0.5'>Update</button>
                      <button className='bg-red-700 rounded p-0.5' onClick={() => handleDelete(customerReview.review_id)}>Delete</button>
                    </td>
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
    </>
  );
};

export default CustomerReviews;