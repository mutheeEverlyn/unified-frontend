import React, { useEffect, useState } from 'react';
import { useGetPurchaseQuery, TPurchase } from '../features/purchase/PurchaseApi';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, startOfWeek, parseISO } from 'date-fns';

// Register the Chart.js components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface MyPurchaseChartProps {
  user_id: number;
}

const MyPurchaseChart: React.FC<MyPurchaseChartProps> = ({ user_id }) => {
  const { data: purchase, error, isLoading, isError } = useGetPurchaseQuery();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (purchase) {
      // Filter purchase by user_id and aggregate by week
      const userPurchase = purchase.filter((purchase: TPurchase) => purchase.user_id === user_id);
      const weeklyPurchase: { [weekStart: string]: number } = {};

      userPurchase.forEach((purchase: TPurchase) => {
        const purchaseDate = parseISO(purchase.purchase_date);
        const weekStart = format(startOfWeek(purchaseDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');

        if (!weeklyPurchase[weekStart]) {
          weeklyPurchase[weekStart] = 0;
        }

        weeklyPurchase[weekStart] += purchase.total_amount;
      });

      // Prepare chart data
      const labels = Object.keys(weeklyPurchase);
      const data = Object.values(weeklyPurchase);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total Amount',
            data: data,
            backgroundColor: 'rgba(255, 213, 79, 0.2)',
            borderColor: 'rgba(255, 213, 79, 1)',
            borderWidth: 1,
            fill: true,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [purchase, user_id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.data?.message || 'An error occurred'}</div>;

  return (
    <div className="chart-container">
      <h2>Purchase Summary</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Week Start Date',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total Amount',
                },
              },
            },
          }}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default MyPurchaseChart;