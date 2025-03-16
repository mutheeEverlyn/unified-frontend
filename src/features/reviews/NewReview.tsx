import React, { useState } from "react";
import { useCreateCustomerReviewsMutation } from "./ReviewsApi";
import { Toaster, toast } from 'sonner';

const NewReview: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No data.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const [createReview] = useCreateCustomerReviewsMutation();

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === null || rating < 1 || rating > 5) {
      toast.error('Rating must be between 1 and 5');
      return;
    }

    const newReview = {
      user_id: user_id,
      rating,
      comment
    };

    console.log('Sending review data:', newReview);

    try {
      const response = await createReview(newReview).unwrap();
      console.log('Server response:', response);
      toast.success('Review created successfully');
      setRating(null);
      setComment('');
    } catch (error) {
      console.error('Failed to create review:', error);
      if (error && typeof error === 'object' && 'originalStatus' in error) {
        if ((error as any).originalStatus === 429) {
          toast.error('Too many requests, please try again later.');
        } else if ((error as any).originalStatus === 400) {
          toast.error('Bad request: ' + (error as any).data.error);
        } else {
          toast.error('Failed to create review');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
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
      <div className="overflow-x-auto bg-gray-400 text-white rounded-lg p-4 min-h-screen">
        <h1 className='text-xl my-4'>Create Review</h1>
        <form onSubmit={handleCreateReview} className="mb-4">
          <div className="mb-2">
            <label htmlFor="rating" className="block">Rating:</label>
            <input
              id="rating"
              type="number"
              value={rating !== null ? rating : ''}
              placeholder="1,2,3,4,5"
              onChange={(e) => setRating(e.target.valueAsNumber)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="comment" className="block">Description:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <button type="submit" className="btn bg-amber-300 p-1 rounded-b-md">Create Review</button>
        </form>
      </div>
    </>
  );
};

export default NewReview;