import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar'
import Footer from "../components/Footer";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster,toast } from "sonner";
type contactData = {
  full_name: string;
  email: string;
  contact_phone:string;
};



const ContactUs: React.FC=() => {
  const {  handleSubmit, formState: { errors } } = useForm<contactData>();
  const navigate = useNavigate();
 
  const onSubmit:SubmitHandler<contactData>=async()=>{
    try{
      
    toast.success("message sent successfully ") 
      navigate('/')
    }catch(error){
      console.log('error sending the message',error);
      toast.error('message sent failed')
    }
  };


  return (
    <>
      <Toaster toastOptions={{
                classNames: {
                    error: 'bg-red-400',
                    success: 'text-green-400',
                    warning: 'text-yellow-400',
                    info: 'bg-blue-400',
                },
            }}
            />
            <Navbar/>
      <div className="mx-auto flex flex-col container min-h-[620px] items-center">
        <h1 className="font-bold text-3xl m-auto">Contact us today for any queries</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mx-auto w-2/3 my-10 border-blue-400 rounded-md border-2 p-10">
          <label htmlFor="full_name"> full name</label>
          {errors.full_name && <p className='text-red-600'>{errors.full_name.message}</p>}
          <input type="text" placeholder="John Doe" className="border-2 border-black rounded-md p-2" />
          
          <label htmlFor="email">email</label>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          <input type="email"  placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2" />
          <label htmlFor="contact_phone">contact_phone</label>
          {errors.contact_phone && <p className='text-red-600'>{errors.contact_phone.message}</p>}
          <input type="text" className="border-2 border-black rounded-md p-2"/>
          <label htmlFor="address">comment or message</label>
          <textarea  className="border-2 border-black rounded-md p-2 w-30 h-20"></textarea>
        
          <button type="submit" className="rounded-md bg-blue-400 p-2">
            <Link to='/contactSuccess'>submit</Link>
          </button> 
          <button type="submit" className="rounded-md bg-blue-400 p-2">
            <Link to='/'>Go back</Link>
          </button>   
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
