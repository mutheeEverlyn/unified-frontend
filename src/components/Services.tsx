
import Navbar from "./Navbar";
import Footer from "./Footer";
import house7 from "../assets/house7.png";
import land from '../assets/land.jpg';
import vehicle from '../assets/Range Rover Evoque.jfif'

const Services = () => {
  return (
    <>
    <Navbar/>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-center mt-2 ">our services</h1>
    <div className="w-full max-w-full max-h-[620px] flex mt-1.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
        <div className="space-y-5 order-1 sm:order-1 sm:pr-32">
              <p className="text-black text-2xl font-serif">We are a company offer our customers a wide range of properties located all over our country .
              We believe that everyone deserves to experience the pleasure of living in a luxurious environment at an affordable price.</p>
             {/* <button className="bg-gray-400 p-2 rounded-md"><Link to='/services'>more services</Link></button>  */}
            </div>
            <div className="order-2 sm:order-2">
            <img src={house7} alt="house"/>
          </div>
          </div>
          </div>

      <div className="w-full max-w-full max-h-[620px] flex mt-1.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
      <div className="order-1 sm:order-1">
           <img src={land} alt="service2" />
        </div>
        <div className="space-y-5 order-2 sm:order-2 sm:pr-32 ">
          <p className="text-black text-2xl font-serif">
           We offer good land for both farming and also for construction purposes all over the country
            </p>
       </div>
      </div>
    </div> 
    
    <div className="w-full max-w-full max-h-[620px] flex mt-1.5">
     < div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
       <div className="space-y-5 order-1 sm:order-1 sm:pr-32 ">
         <p className="text-black text-2xl font-serif">
            Our vehicles are affordable and in good conditions ready for buying and hiring.
           </p>
       </div>
       <div className="order-2 sm:order-2">
          <img src={vehicle} alt="service3" />
       </div>
      </div>
     </div>
     <Footer/>
     </>
  );
};

export default Services;
