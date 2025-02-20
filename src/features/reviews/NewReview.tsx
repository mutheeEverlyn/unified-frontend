import React, { useState } from "react";
import { useCreateCustomerReviewsMutation} from "./ReviewsApi";
import { Toaster, toast } from 'sonner';
// import { Tticket } from "./TicketApi";

const NewReview:React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No data.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const [createReview] = useCreateCustomerReviewsMutation()

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      user_id: user_id,
      rating,
      comment,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      await createReview(newReview).unwrap();
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error('Failed to create review');
    }
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
        <h1 className='text-xl my-4'>Create Review</h1>
        <form onSubmit={handleCreateReview} className="mb-4">
          <div className="mb-2">
            <label htmlFor="rating" className="block">Rating:</label>
            <input
              id="rating"
              type="number"
              value={rating}
              placeholder="1,2,3,4,5,"
              onChange={(e) => setRating(e.target.valueAsNumber)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="comment" className="block">Description:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button type="submit" className="btn bg-amber-300 p-1 rounded-b-md">Create Review</button>
        </form>
      </div>
    </>
  )
};

export default NewReview;
