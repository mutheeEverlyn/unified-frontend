import React from 'react';
import { Toaster, toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ChartReportDownloadsProps {
  chartRefs: {
    purchaseSummaryRef: React.RefObject<HTMLDivElement>;
    revenueReportRef: React.RefObject<HTMLDivElement>;
    reviewsChartRef: React.RefObject<HTMLDivElement>;
  };
}

const ChartReportDownloads: React.FC<ChartReportDownloadsProps> = ({ chartRefs }) => {
  const downloadChartAsPDF = async (chartRef: React.RefObject<HTMLDivElement>, chartName: string) => {
    try {
      if (!chartRef.current) {
        throw new Error('Chart element not found');
      }

      // Create canvas from chart
      const canvas = await html2canvas(chartRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add title
      pdf.setFontSize(20);
      pdf.text(`${chartName} Chart Report`, 20, 20);
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

      // Add chart image
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 40, imgWidth, imgHeight);

      // Save PDF
      pdf.save(`${chartName.toLowerCase()}_chart_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success(`${chartName} chart report downloaded successfully`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error(`Failed to download ${chartName} chart report`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Download Chart Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => downloadChartAsPDF(chartRefs.purchaseSummaryRef, 'Purchase Summary')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Download Purchase Summary
        </button>
        <button
          onClick={() => downloadChartAsPDF(chartRefs.revenueReportRef, 'Revenue Report')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Download Revenue Report
        </button>
        <button
          onClick={() => downloadChartAsPDF(chartRefs.reviewsChartRef, 'Reviews Chart')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Download Reviews Chart
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default ChartReportDownloads; 