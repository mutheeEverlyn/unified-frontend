import logo from '../assets/logo.png'
import hamburger from '../assets/icon-hamburger.svg'
import { useState } from 'react'
import close from '../assets/icon-close.svg'
import  {Link}  from 'react-router-dom'
import MobileMenu from './MobileMenu'
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className='flex gap-10 bg-black text-white   w-full  relative  shadow-md duration-300 md:items-center justify-between h-20  md:gap-0 '>
      <div className='w-32 lg:w-40 md:w-32 '><img src={logo}  className='h-20 w-full' alt="logo"/></div>
      <nav className='hidden  md:flex md:justify-between md:gap-1'>
      <ul className='flex   gap-5 items-center md:gap-3 '>
        <li><button><Link to='/' className='hover:border-b-2 hover:text-amber-300'>HOME</Link></button></li>
        <li><button><Link to='/about-us'  className='hover:border-b-2 hover:text-amber-300'>ABOUT US</Link></button></li>
        <li><button><Link to='/services'  className='hover:border-b-2 hover:text-amber-300'>SERVICES</Link></button></li>
        <li><button><Link to='/contact-us'  className='hover:border-b-2 hover:text-amber-300'>CONTACT US</Link></button></li>
      </ul>
      <div className='flex gap-5 items-center md:gap-2 lg:ml-40'>
      <button className=' bg-amber-300  hover:bg-gray-400 transition duration-500 rounded-md w-20 h-10 my-10'><Link to='/login'> LOGIN</Link></button>
      <button className='bg-amber-300  hover:bg-gray-400 transition duration-500 rounded-md w-20 h-10 my-10 '><Link to='/register'>REGISTER</Link></button>
      </div>
      </nav>
      {showMenu?(
       <button onClick={toggleMenu} className='cursor-pointer transition-all '><img src={close} alt='close icon' className='bg-transparent  m-auto md:hidden h-10 '/></button>
      ):(
        <button onClick={toggleMenu} className=' cursor-pointer transition-all' >< img src={hamburger} alt='icon humburger' className='bg-transparent  m-auto md:hidden h-10 '/></button>
      )}
      <MobileMenu showItems={showMenu}/>
    </div>
  )
}

export default Navbar
