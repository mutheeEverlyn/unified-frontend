import { RiLogoutCircleLine } from "react-icons/ri";
import hamburger from '../assets/icon-hamburger.svg';
import close from '../assets/icon-close.svg';
import { useState } from 'react';
import AdminPhoneDashboard from "./AdminPhoneDashboard";
import { NavLink, Outlet, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { CircleDollarSign, LayoutDashboard, CarFront, LandPlot, House, UserRoundCog, MapPin, TicketCheck} from 'lucide-react';
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
              <NavLink to="" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <LayoutDashboard className="mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="vehicles" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <CarFront className="mr-2" />
                Manage Vehicles
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="purchase-vehicle" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <CarFront className="mr-2" />
                Vehicles List
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="users" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <UserRoundCog className="mr-2" />
                Manage Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="location" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <MapPin className="mr-2" />
                Locations
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="customer-reviews" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <TicketCheck className="mr-2" />
                Reviews
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="purchase-house" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <House className="mr-2" />
                House List
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="houses" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <House className="mr-2" />
                Manage Houses
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="purchase-land" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <LandPlot className="mr-2" />
                Land List
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="land" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <LandPlot className="mr-2" />
                Manage Land
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="payments-info" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <CircleDollarSign className="mr-2" />
                Payments
              </NavLink>
            </li>
            {/* <li className="mb-2">
              <NavLink to="purchase" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
                <ShoppingCart className="mr-2" />
                Purchase
              </NavLink>
            </li> */}
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