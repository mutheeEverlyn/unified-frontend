import React from "react";
import { useOutletContext } from 'react-router-dom';
import MyPurchaseChart from "./MyPurchaseChart";
import ReviewsChart from "../features/reviews/ReviewsChart";
const Dashboard:React.FC = () => {
  const { user_id } = useOutletContext<{ user_id: number }>();
  return (
    <div>
      <ReviewsChart user_id={user_id}/> 
      <MyPurchaseChart user_id={user_id}/>
    </div>
  )
}

export default Dashboard

