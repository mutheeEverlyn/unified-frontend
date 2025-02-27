import React,{useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginUserMutation } from "./LoginApi"; 
import { Toaster, toast } from 'sonner';
import { MdAlternateEmail } from 'react-icons/md';
import{FaFingerprint,FaRegEye,FaRegEyeSlash} from 'react-icons/fa';
type FormData = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
  const [showPassword,setShowPassword]=useState<boolean>(false);
  const togglePasswordVisibility=()=>setShowPassword(!showPassword);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const response = await loginUser(formData).unwrap();
      console.log('Login response:', response);

      if (response.token) {
        // Store the token and user details in localStorage
        localStorage.setItem('userDetails', JSON.stringify({ user_id: response.user.user_id, token: response.token ,role:response.user.role }));

        if (response.user.role === "user") {
          toast.success('Login successful');
          navigate('/userDashboard');
        } else if (response.user.role === 'admin') {
          toast.success('Login successful');
          navigate('/adminDashboard');
        }
        else {
          toast.error('Login failed: Unknown role');
        }
      } else {
        toast.error('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed: Invalid credentials or server error');
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
      }} />
      <div className="m-auto flex flex-col container min-h-screen  login">
        <h1 className="font-bold text-3xl mx-auto mt-20 ">ALLNONE ASSETS</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-gray-300 shadow-lg  flex flex-col gap-5 my-10  w-96  rounded-md  p-10 mx-auto ">
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          <div className='w-full flex items-center relative p-2 rounded-xl gap-2 bg-gray-400'>
          <MdAlternateEmail/>
          <input
            type="email"
            {...register("email", {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            placeholder="Email address"
            className=" bg-transparent outline-none border-0"
          />
</div>
          {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
          <div className='w-full flex items-center relative p-2 rounded-xl gap-2 bg-gray-400'>
            <FaFingerprint/>
          <input
            type={showPassword ? "password": "text"}
            {...register("password", {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            placeholder="Password"
            className="  bg-transparent outline-none border-0  w-full"
            />
          { showPassword ? (<FaRegEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />):(<FaRegEye className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility}/>)}
          </div >
          <button type="submit" className="rounded-md bg-amber-300  hover:bg-gray-400 p-2 *:transition duration-500" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-red-600">Failed to login: {error.message}</p>}

          <button type="button" className="rounded-md bg-amber-300  hover:bg-gray-400 p-2 *:transition duration-500">
            <Link to='/'>Go Home</Link>
          </button>
          <p>not registered? <Link to='/register' className='text-amber-300  hover:text-gray-400 *:transition duration-500'>Register</Link></p>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
