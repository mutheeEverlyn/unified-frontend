import React from 'react';
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './components/AboutUs';
import FeaturedProperties from './components/FeaturedProperties';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Admin from './components/Admin';
import Register from './features/register/Register';
import AdminDashboard from './dashboard/AdminDashboard';
import UserDashboard from './dashboard/UserDashboard';
import Login from './features/login/Login';
import ContactUs from './components/ContactUs';
import RouteProtection from './components/RouteProtection';
import UsersTable from './features/user_management/UsersTable';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import ContactSuccess from './components/ContactSuccess';
import MyReviews from './features/reviews/MyReviews';
import NewReview from './features/reviews/NewReview';
import CustomerReviews from './features/reviews/CustomerReviews';
import PurchaseHouse from './features/purchase/PurchaseHouse';
import PurchaseLand from './features/purchase/PurchaseLand';
import PurchaseVehicle from './features/purchase/PurchaseVehicle';
import Purchase from './features/purchase/Purchase';
import Land from './features/purchase/Land';
import Houses from './features/purchase/Houses';
import Vehicles from './features/purchase/Vehicles';
import PaymentsInfo from './components/PaymentsInfo';
import Location from './features/location/Location';
const App:React.FC=()=> {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: 'about-us',
      element: <AboutUs />,
      errorElement: <Error />,
    },
    {
      path: 'featured-properties',
      element: <FeaturedProperties />,
      errorElement: <Error />,
    },
    {
      path: 'adminDashboard/*',
      element: <RouteProtection element={AdminDashboard} role="admin"/>,
      errorElement: <Error />,
      children: [
        {
          path: 'adminDashboard',
          element: <Admin />,
        },
        {
          path: 'users',
          element: <UsersTable />,
        },
        {
          path: 'customer-reviews',
          element: <CustomerReviews />,
        },
        {
          path: 'land',
          element: <Land />
        },
        {
          path: 'houses',
          element: <Houses />
        },
        {
          path: 'vehicles',
          element: <Vehicles />
        },
        {
          path: 'location',
          element: <Location />
        },
        {
          path: 'payments-info',
          element: <PaymentsInfo />
        },
        {
         path: 'purchase-land',
         element: <PurchaseLand />
        },
        {
         path: 'purchase-house',
         element: <PurchaseHouse/>
        },
        {
         path: 'purchase-vehicle',
         element: <PurchaseVehicle />
        },
      ],
    },
    {
      path: 'userDashboard/*',
      element: <RouteProtection element={UserDashboard} role="user"/>,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'my-reviews',
          element: <MyReviews />,
        },
       {
         path: 'new-review',
        element: <NewReview />,
       },
       {
        path: 'purchase-land',
        element: <PurchaseLand />,
       },
       {
        path: 'purchase-house',
        element: <PurchaseHouse/>,
       },
       {
        path: 'purchase-vehicle',
        element: <PurchaseVehicle/>,
       },
       {
        path: 'purchase',
        element: <Purchase/>,
       },
      ],
    },
    {
      path:'contact-us',
      element: <ContactUs />,
      errorElement: <Error />,
    },
    {
      path: 'contactSuccess',
      element: <ContactSuccess />,
      errorElement: <Error />,
    },
    {
      path: 'services',
      element: <Services />,
      errorElement: <Error />,
    },
  ]);
  return(
    <div>
    <RouterProvider router={router}/>
    </div>
    );
};

export default App; 