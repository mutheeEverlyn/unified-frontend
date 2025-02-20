import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
interface mobile{
  showItems:boolean;
}
const MobileMenu =({showItems}:mobile) => {
  return (
    
    <div
    className={`${
      showItems ? "right-0" : "-left-[100%]"
    } fixed bottom-0 top-16 z-20 flex h-screen w-[75%] flex-col justify-between   px-8 pb-6 pt-16  transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
  >
    <div className="card bg-black">
    <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1 className="pt-2">Hello User</h1>
          </div>
        </div>
    <nav className="mt-2">
    <ul className="space-y-2 text-xl px-5">
        <li><button><Link to='/' className='hover:border-b-2 hover:text-blue-400 mb-2 inline-block'>HOME</Link></button></li>
        <li><button><Link to='/about-us'  className='hover:border-b-2 hover:text-blue-400 mb-2 inline-block'>ABOUT US</Link></button></li>
        <li><button><Link to='/services'  className='hover:border-b-2 hover:text-blue-400 mb-2 inline-block'>SERVICES</Link></button></li>
        <li><button><Link to='/contactUs'  className='hover:border-b-2 hover:text-blue-400 mb-2 inline-block'>CONTACT US</Link></button></li>
        <li> <button className=' bg-blue-400  hover:bg-primary/80 transition duration-500 rounded-md w-24 h-10 '><Link to='/login'> LOGIN</Link></button></li>
        <li> <button className='bg-blue-400  hover:bg-primary/80 transition duration-500 rounded-md w-24 h-10 '><Link to='/register'>REGISTER</Link></button></li>
      </ul>
    </nav>

    </div>
    </div>
  )
}

export default MobileMenu
