import React from 'react';
import { useGetCustomerReviewQuery, useDeleteCustomerReviewMutation } from './CustomerReviewsApi';
import { Toaster, toast } from 'sonner';
import { TCustomerReview } from './CustomerReviewsApi';
const CustomerReviews: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const token = userDetails?.token;
  const { data, error, isLoading, isError } = useGetCustomerReviewQuery(undefined, {   headers: {
    'Authorization': `${token}`
  }
});
  const [deleteCustomerReview, { data: deleteMsg }] = useDeleteCustomerReviewMutation();

  const handleDelete = async (review_id: number) => {
    await deleteCustomerReview(review_id);
    toast.success(deleteMsg?.msg || 'customer support review deleted successfully');
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
      <div className="overflow-x-auto  bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className='text-xl my-4'>customer Review Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
            <th className='text-white border border-white px-4 py-2'>user_id</th>
              <th className='text-white border border-white px-4 py-2'>review_id</th>
              <th className='text-white border border-white px-4 py-2'>rating</th>
              <th className='text-white border border-white px-4 py-2'>comment</th>
              <th className='text-white border border-white px-4 py-2'>created_at</th>
              <th className='text-white border border-white px-4 py-2'>updated_at</th>
              <th className='text-white border border-white px-4 py-2'>address</th>
              <th className='text-white border border-white px-4 py-2'>contact_phone</th>
              <th className='text-white border border-white px-4 py-2'>created_at</th>
              <th className='text-white border border-white px-4 py-2'>email</th>
              <th className='text-white border border-white px-4 py-2'>full_name</th>
              <th className='text-white border border-white px-4 py-2'>updated_at</th>
              <th className='text-white border border-white px-4 py-2'>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={12}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={12}>Error: {error?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((customerReview:TCustomerReview, index:number) => (
                  <tr key={index}>
                     <td>{customerReview.user_id}</td>
                    <th>{customerReview.review_id}</th>
                    <td>{customerReview.rating}</td>
                    <td>{customerReview.comment}</td>
                    <td>{customerReview.created_at}</td>
                    <td>{customerReview.user.address}</td>
                    <td>{customerReview.user.contact_phone}</td>
                    <td>{customerReview.user.created_at}</td>
                    <td>{customerReview.user.email}</td>
                    <td>{customerReview.user.full_name}</td>
                    <td>{customerReview.user.updated_at}</td>
                    <td className='flex gap-2'>
                      <button className='bg-green-400 rounded p-0.5'>update</button>
                      <button className='bg-red-700 rounded p-0.5' onClick={() => handleDelete(customerReview.review_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr><td className='text-white' colSpan={12}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default CustomerReviews;
