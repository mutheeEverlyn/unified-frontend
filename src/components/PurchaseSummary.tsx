import React, { useEffect, useState } from 'react';
import { useGetPurchaseQuery, TPurchase } from '../features/purchase/PurchaseApi';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, startOfWeek, parseISO } from 'date-fns';

// Register the Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PurchaseSummary: React.FC = () => {
  const { data: purchase, isLoading, isError } = useGetPurchaseQuery();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (purchase) {
      // Aggregate purchase by week
      const weeklyPurchase: { [weekStart: string]: number } = {};

      purchase.forEach((purchase: TPurchase) => {
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
            backgroundColor: 'rgb(255, 213, 79)',
            borderColor: 'rgba(255, 213, 79, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [purchase]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading purchase</div>;
  }

  return (
    <div className="chart-container">
      <h2 className="text-xl mb-4">Purchase Summary</h2>
      {chartData ? (
        <Bar
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
                ticks: {
                  stepSize: 1,
                  callback: function (value) {
                    if (Number.isInteger(value)) {
                      return value;
                    }
                  },
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

export default PurchaseSummary;