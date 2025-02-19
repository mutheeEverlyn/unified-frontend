import React from 'react';
import PurchaseSummary from "./PurchaseSummary"
import RevenueReport from "./RevenueReport"
const Admin: React.FC = () => {

  return (
    <div className='min-h-screen'>
      <PurchaseSummary/>
      <RevenueReport/>
    </div>
  );
};

export default Admin;
