import React, { useRef } from 'react';
import PurchaseSummary from "./PurchaseSummary"
import RevenueReport from "./RevenueReport"
import AllReviewsChart from './AllReviewsChart';
import ChartReportDownloads from './ChartReportDownloads';

const Admin: React.FC = () => {
  // Create refs for the charts
  const purchaseSummaryRef = useRef<HTMLDivElement>(null);
  const revenueReportRef = useRef<HTMLDivElement>(null);
  const reviewsChartRef = useRef<HTMLDivElement>(null);

  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      {/* Download Reports Section */}
      <ChartReportDownloads 
        chartRefs={{
          purchaseSummaryRef,
          revenueReportRef,
          reviewsChartRef
        }}
      />

      {/* Charts Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purchase Summary Chart */}
        <div ref={purchaseSummaryRef} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Purchase Summary</h2>
          <PurchaseSummary/>
        </div>

        {/* Revenue Report Chart */}
        <div ref={revenueReportRef} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue Report</h2>
          <RevenueReport/>
        </div>

        {/* Reviews Chart - Full Width */}
        <div ref={reviewsChartRef} className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Reviews Analysis</h2>
          <AllReviewsChart/>
        </div>
      </div>
    </div>
  );
};

export default Admin;
