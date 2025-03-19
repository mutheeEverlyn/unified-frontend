import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetCustomerReviewsQuery } from '../features/reviews/ReviewsApi';
import { Toaster } from 'sonner';

// Define the Review interface
interface Review {
  rating: number;
  // Add other review properties if needed
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AllReviewsChart: React.FC = () => {
  // Get user details from localStorage
  const userDetails = localStorage.getItem('userDetails');
  const token = userDetails ? JSON.parse(userDetails).token : null;

  const { data: reviews, isLoading, error, isError } = useGetCustomerReviewsQuery(undefined, {
    skip: !token, // Skip the query if there's no token
    headers: token ? {
      'Authorization': token
    } : undefined
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading reviews data...</div>;
  }

  if (isError) {
    console.error('Error loading reviews:', error);
    return (
      <div className="text-center py-4 text-red-500">
        Error loading reviews data. Please make sure you're logged in and have the correct permissions.
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <div className="text-center py-4">No reviews data available</div>;
  }

  // Process reviews data to count ratings with proper typing
  const ratingCounts = reviews.reduce((acc: { [key: number]: number }, review: Review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the chart
  const chartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Number of Reviews',
        data: [
          ratingCounts[1] || 0,
          ratingCounts[2] || 0,
          ratingCounts[3] || 0,
          ratingCounts[4] || 0,
          ratingCounts[5] || 0,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Reviews Distribution by Rating',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Toaster position="top-center" />
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AllReviewsChart; 