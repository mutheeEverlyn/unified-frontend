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
      <div className="m-auto flex flex-col container min-h-screen">
        <h1 className="font-bold text-3xl m-auto">Register with ALLNONE ASSETS to get started</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mx-auto w-2/3 my-10 border-blue-400 rounded-md border-2 p-10">
          <label htmlFor="full_name">Enter Your full name</label>
          {errors.full_name && <p className='text-red-600'>{errors.full_name.message}</p>}
          <input type="text" 
            {...register("full_name", {
              required: 'full_name is required'
            })}
          placeholder="John Doe" className="border-2 border-black rounded-md p-2" />
          
          <label htmlFor="email">Enter Your email</label>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          <input type="email" 
           {...register("email", {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
           placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2" />
          
          <label htmlFor="password">Enter Your password</label>
          {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
          <input type="password" 
          {...register("password", {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
           placeholder="**********" className="border-2 border-black rounded-md p-2" />
          <label htmlFor="contact_phone">contact_phone</label>
          {errors.contact_phone && <p className='text-red-600'>{errors.contact_phone.message}</p>}
          <input type="text" 
           {...register("contact_phone", {
            required: 'contact_phone is required'
          })}
          className="border-2 border-black rounded-md p-2"/>
          <label htmlFor="address">address</label>
          {errors.address && <p className='text-red-600'>{errors.address.message}</p>}
          <input type="text"
           {...register("address", {
            required: 'address is required'
          })}
          className="border-2 border-black rounded-md p-2"/>
          {/* <label htmlFor="role">role</label>
          {errors.role && <p className='text-red-600'>{errors.role.message}</p>}
          <input type="text" 
           {...register("role", {
            required: 'role is required'
          })}
          placeholder="user"
          className="border-2 border-black rounded-md p-2"/> */}
          <button type="submit" className="rounded-md bg-blue-400 p-2" disabled={isLoading}> {isLoading ? 'registering...' : 'register'}</button>
          {error && <p className="text-red-600">Failed to register: {error.message}</p>}
          <button type="submit" className="rounded-md bg-blue-400 p-2">
            <Link to='/'>Go Back</Link>
          </button>
          <p>Already registered? <Link to='/login' className="text-blue-400">LOGIN</Link></p>
          
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
