import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <>
      <div  className=" py-14 ">
        <div className="w-full max-w-full ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-400 py-8 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
               Feel free to consult us where you may feel needs correction or improvements on MyTask app .
              </h1>
              <p className="text-gray-800">
                we value your feedback
              </p>
            </div>
            <div className="sm:grid sm:place-items-center">
              <button className="inline-block font-semibold  hover:bg-gray-300 transition duration-500 py-2 px-6 bg-amber-300 text-white tracking-widest uppercase rounded-md" >
               <Link to='/contact-us'>Contact Us</Link> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
