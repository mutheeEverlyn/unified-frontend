import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartData, ChartOptions, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';
import { useGetCustomerReviewsQuery, TReview } from './ReviewsApi';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface reviewsChartProps {
  user_id: number;
}

const ReviewsChart: React.FC<reviewsChartProps> = ({ user_id }) => {
  const { data: reviews, error, isLoading, isError } = useGetCustomerReviewsQuery();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (reviews) {
      const userReviews = reviews.filter((review: TReview) => review.user_id === user_id);
      const statusCounts: { [key: string]: number } = {};

      userReviews.forEach((review: TReview) => {
        statusCounts[review.rating] = (statusCounts[review.rating] || 0) + 1;
      });

      setChartData({
        labels: Object.keys(statusCounts),
        datasets: [
          {
            label: 'Number of reviews',
            data: Object.values(statusCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [reviews, user_id]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef.current && chartData.labels && chartData.labels.length > 0) {
      const newChartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        } as ChartOptions<'bar'>,
      });

      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.data?.message || 'An error occurred'}</div>;

  return (
    <div className="chart-container">
      <h2>reviews Overview</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ReviewsChart;
