import { RiLogoutCircleLine } from "react-icons/ri";
import hamburger from '../assets/icon-hamburger.svg';
import close from '../assets/icon-close.svg';
import { useState } from 'react';
import AdminPhoneDashboard from "./AdminPhoneDashboard";
import { NavLink, Outlet,Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { CircleDollarSign, LayoutDashboard, CarFront,LandPlot,House,UserRoundCog, MapPin, TicketCheck} from 'lucide-react';
import { MdAdminPanelSettings } from "react-icons/md";
import { useGetUserByIdQuery } from '../features/user_management/UsersApi';

const AdminDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No user is logged in.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data, error, isLoading } = useGetUserByIdQuery(user_id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
  };

  return (
    <>
      <div className="bg-black h-16 flex items-center justify-between px-4">
        <button
          onClick={handleLogout}
          type="submit"
          className="bg-amber-300 text-white hover:bg-primary/80 transition duration-300 rounded-md w-20 h-10 md:ml-auto m-2"
        >
          <div className="flex items-center text-white">
            <RiLogoutCircleLine className='text-white' />
            <Link to='/'>Logout</Link>
          </div>
        </button>
        {showMenu ? (
          <button onClick={toggleMenu} className='cursor-pointer transition-all'>
            <img src={close} alt='close icon' className='bg-transparent m-auto md:hidden h-10' />
          </button>
        ) : (
          <button onClick={toggleMenu} className='cursor-pointer transition-all'>
            <img src={hamburger} alt='hamburger icon' className='bg-transparent m-auto md:hidden h-10' />
          </button>
        )}
        <AdminPhoneDashboard showItems={showMenu} />
      </div>
      <div className="flex min-h-screen">
        <div className="w-full md:w-1/5 bg-gray-400 p-4 text-white md:block hidden">
          <div className="flex items-center justify-start gap-3 pb-3">
            <MdAdminPanelSettings size={50} />
            <div>
              <h1 className="pt-2">Welcome {data.full_name}</h1>
            </div>
          </div>
          <ul>
            <li className="mb-2">
              <NavLink to="/adminDashboard" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <LayoutDashboard className="text-white mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/vehicles" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <CarFront className="text-white mr-2" />
                Manage Vehicles
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/purchase-vehicle" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <CarFront className="text-white mr-2" />
                Vehicles List
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/users" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <UserRoundCog className="text-white mr-2" />
                Manage Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/location" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <MapPin className="text-white mr-2" />
                Locations
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/customer-reviews" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <TicketCheck className="text-white mr-2" />
                reviews
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/purchase-house" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <House className="text-white mr-2" />
                house list
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/houses" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <House className="text-white mr-2" />
                manage houses
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/purchase-land" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <LandPlot className="text-white mr-2" />
                land list
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/land" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <LandPlot className="text-white mr-2" />
                manage land
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/adminDashboard/payments-info" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-amber-300' : ''}`}>
                <CircleDollarSign className="text-white mr-2" />
                Payments
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <Outlet /> {/* This renders the matched child route */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
