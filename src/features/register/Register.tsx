import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "./RegisterApi";
import { Toaster,toast } from "sonner";
type FormData = {
  full_name: string;
  email: string;
  password: string;
  contact_phone:string;
  address:string;
  role:string;
};



const Register: React.FC=() => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
 
  const onSubmit:SubmitHandler<FormData>=async(formData)=>{
    try{
      
     await registerUser(formData).unwrap();
    toast.success("you have successfully registerd") 
      navigate('/login')
    }catch(error){
      console.log('registration error',error);
      toast.error('registration failed')
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
      <div className="m-auto flex flex-col container min-h-screen login">
        <h1 className="font-bold text-3xl mx-auto">ALLNONE ASSETS</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5  w-96 my-10 bg-white rounded-md  p-10 mx-auto shadow-gray-300 shadow-lg">
          {errors.full_name && <p className='text-red-600'>{errors.full_name.message}</p>}
          <div className='w-full flex items-center relative p-2 rounded-xl gap-2 bg-gray-400'>
          <input type="text" 
            {...register("full_name", {
              required: 'full_name is required'
            })}
          placeholder="Full Name" className=" bg-transparent outline-none border-0" />
          </div>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          <div className='w-full flex items-center relative p-2 rounded-xl gap-2 bg-gray-400'>
          <input type="email" 
           {...register("email", {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
           placeholder="Email address" className=" bg-transparent outline-none border-0 " />
        </div>
          {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
          <div className='w-full flex items-center relative p-2 rounded-xl gap-2 bg-gray-400'>
          <input type="password" 
          {...register("password", {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
           placeholder="Password" className="bg-transparent outline-none border-0" />
           </div>
          {errors.contact_phone && <p className='text-red-600'>{errors.contact_phone.message}</p>}
          <div className='w-full flex items-center relative p-2 rounded-xl gap-2 bg-gray-400'>
          <input type="text" 
           {...register("contact_phone", {
            required: 'contact_phone is required'
          })}
          placeholder="Contact Phone"
          className="bg-transparent outline-none border-0 "/>
          </div>
          {errors.address && <p className='text-red-600'>{errors.address.message}</p>}
          <div className='w-full flex items-center relative p-2 rounded-xl gap-2 bg-gray-400'>
          <input type="text"
           {...register("address", {
            required: 'address is required'
          })}
          placeholder="Address"
          className="bg-transparent outline-none border-0"/>
          </div>
          <button type="submit" className="rounded-md bg-amber-300 p-2  hover:bg-gray-400 *:transition duration-500" disabled={isLoading}> {isLoading ? 'registering...' : 'register'}</button>
          {error && <p className="text-red-600">Failed to register: {error.message}</p>}
          <button type="submit" className="rounded-md bg-amber-300 hover:bg-gray-400 p-2 *:transition duration-500">
            <Link to='/'>Go Home</Link>
          </button>
          <p>Already registered? <Link to='/login' className="text-amber-300  hover:text-gray-400 *:transition duration-500">LOGIN</Link></p>
          
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
