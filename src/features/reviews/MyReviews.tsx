import React, { useState } from 'react';
import { useGetCustomerReviewsQuery, useUpdateCustomerReviewsMutation } from './ReviewsApi';
import { Toaster, toast } from 'sonner';
import { TReview } from './ReviewsApi';

const MyReviews: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No data.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data: reviews, error, isLoading, isError } = useGetCustomerReviewsQuery();
  const [updatereview] = useUpdateCustomerReviewsMutation();

  const [ediTReviewId, setEdiTReviewId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    rating:0,
    comment: '',
  });

  const handleEdit = (review: TReview) => {
    setEdiTReviewId(review.review_id);
    setFormData({
      rating: review.rating,
      comment: review.comment
    });
  };

  const handleUpdate = async (review_id: number) => {
    const updatereviewData = {
      ...formData,
      updated_at: new Date().toISOString(),
    };
    try {
      await updatereview({ review_id, ...updatereviewData }).unwrap();
      toast.success('review updated successfully');
      setEdiTReviewId(null);
    } catch (err) {
      toast.error('Failed to update review');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Myreviews = reviews?.filter((review: TReview) => review.user_id === user_id);

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
      <div className="overflow-x-auto bg-gray-400 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">My reviews</h1>
        <table className="table-auto border-collapse w-full bg-gray-400 text-white border border-white">
          <thead>
            <tr>
              <th className="text-white border-white px-4 py-2">rating</th>
              <th className="text-white border-white px-4 py-2">comment</th>
              <th className="text-white border-white px-4 py-2">created_at</th>
              <th className="text-white border-white px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8}>Error: {error?.data?.message || 'An error occurred'}</td>
              </tr>
            ) : (
              Myreviews?.map((review: TReview) => (
                <tr key={review.review_id}>
                  <td className="border border-white px-4 py-2">
                    {ediTReviewId === review.review_id ? (
                      <input
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="input input-sm text-black"
                      />
                    ) : (
                      review.rating
                    )}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {ediTReviewId === review.review_id ? (
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="textarea textarea-sm text-black"
                      />
                    ) : (
                      review.comment
                    )}
                  </td>
                 
                  <td className='border border-white px-4 py-2'>{review.created_at}</td>
                  <td className='border border-white px-4 py-2'>
                    {ediTReviewId === review.review_id ? (
                      <>
                        <button
                          className="bg-green-400 text-white px-2 py-1 my-1 rounded-b-md"
                          onClick={() => handleUpdate(review.review_id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-0.5 rounded-b-md"
                          onClick={() => setEdiTReviewId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-green-400 text-white px-2 py-1 mr-2 rounded-b-md"
                        onClick={() => handleEdit(review)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-white" colSpan={8}>
                {Myreviews ? `${Myreviews.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default MyReviews;
