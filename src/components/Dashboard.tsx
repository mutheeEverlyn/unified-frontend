import React from "react";
import { useOutletContext } from 'react-router-dom';
import MyPurchaseChart from "./MyPurchaseChart";
import ReviewsChart from "../features/reviews/ReviewsChart";
import { useGetCustomerReviewsQuery } from '../features/reviews/ReviewsApi';
import { useGetPurchaseQuery, TPurchase } from '../features/purchase/PurchaseApi';
import { Toaster } from 'sonner';

// Define interfaces for the data types
interface Review {
  review_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user_id } = useOutletContext<{ user_id: number }>();
  const userDetails = localStorage.getItem('userDetails');
  const token = userDetails ? JSON.parse(userDetails).token : null;

  // Fetch user's reviews and purchases
  const { data: reviews, isLoading: reviewsLoading } = useGetCustomerReviewsQuery(undefined, {
    skip: !token,
    headers: token ? {
      'Authorization': token
    } : undefined
  });

  const { data: purchases, isLoading: purchasesLoading } = useGetPurchaseQuery(undefined, {
    skip: !token,
    headers: token ? {
      'Authorization': token
    } : undefined
  });

  // Filter user's reviews with proper typing
  const userReviews = reviews?.filter((review: Review) => review.user_id === user_id) || [];
  
  // Calculate stats with proper typing
  const averageRating = userReviews.length > 0
    ? (userReviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / userReviews.length).toFixed(1)
    : '0.0';

  const userPurchases = purchases?.filter((purchase: TPurchase) => purchase.user_id === user_id) || [];

  const totalSpent = userPurchases.reduce((acc: number, purchase: TPurchase) => acc + purchase.total_amount, 0);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Toaster position="top-center" />
      
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Here's an overview of your activity and transactions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Purchases Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Purchases</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {purchasesLoading ? '...' : userPurchases.length || 0}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Spent Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Spent</p>
              <h3 className="text-2xl font-bold text-gray-800">
                ksh{purchasesLoading ? '...' : totalSpent.toLocaleString()}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Average Rating Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Rating</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {reviewsLoading ? '...' : averageRating} ⭐
              </h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purchase Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Purchase History</h2>
          <div className="h-[300px]">
            <MyPurchaseChart user_id={user_id} />
          </div>
        </div>

        {/* Reviews Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reviews Analysis</h2>
          <div className="h-[300px]">
            <ReviewsChart user_id={user_id} />
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {purchasesLoading ? (
            <p className="text-gray-600">Loading recent purchases...</p>
          ) : userPurchases.slice(0, 5).map((purchase: TPurchase) => (
            <div key={purchase.purchase_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Purchase #{purchase.purchase_id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(purchase.purchase_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Property Type: {purchase.property_type}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">ksh{purchase.total_amount}</p>
                <p className="text-sm text-gray-600">{purchase.purchase_status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reviews Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recent Reviews</h2>
        <div className="space-y-4">
          {reviewsLoading ? (
            <p className="text-gray-600">Loading recent reviews...</p>
          ) : userReviews.slice(0, 5).map((review: Review) => (
            <div key={review.review_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center">
                  <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;