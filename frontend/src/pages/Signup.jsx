import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../api/auth";
import { validateForm } from "../utils/validation";

function Signup() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: user => {
      queryClient.setQueryData(['user'], user);
      navigate('/');
    },
    onError: error => {
      if (error.response)
        return toast.error(error.response.data.message);
      return toast.error('Something unexpected occured')
    }
  })

  const [formData, setFormData] = useState({
    firstname: "",
    lastname:"",
    username:"",
    email: "",
    phonenumber: "",
    password: "",
    password_confirmation: "",
  });

  const [typedFields, setTypedFields] = useState(new Set())
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const newTyped = new Set(typedFields);
    newTyped.add(name);
    setTypedFields(newTyped);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.entries(errors).length === 0) {
      mutation.mutate({...formData, 'phonenumber':'+251'+formData.phonenumber})
    } else {
      Object.entries(errors).map((key, val) => toast.error(key + ': ' + val));
    }
  };
  
  const errors = validateForm(formData, ['username']);

  return  <div className="flex justify-center items-center h-screen">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="bg-white px-6 py-8 rounded shadow-md text-black">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <div className="grid md:grid-cols-2 md:gap-6">
    
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="firstname" id="firstname" value={formData.firstname} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            {(typedFields.has('firstname') &&errors.firstname !== '')&& <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.firstname}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            {(typedFields.has('lastname') && errors.lastname !== '')&& <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.lastname}</p>}
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {(typedFields.has('email') && errors.email !== '')&& <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.email}</p>}
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
            <div className="flex">
                <span className="inline-flex items-center px-1 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                +251
                </span>
                <input type="tel" pattern="[0-9]{9}" value={formData.phonenumber} onChange={handleChange} name="phonenumber" id="phonenumber" className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="phonenumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-11 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:-translate-x-0">Phone number (935556072)</label>
            </div>
            {(typedFields.has('phonenumber') &&errors.phonenumber !== '')&& <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.phonenumber}</p>}
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {(typedFields.has('password') && errors.password !== '')&& <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.password}</p>}
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="password_confirmation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
            {(typedFields.has('password_confirmation') && errors.password_confirmation !== '')&& <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.password_confirmation}</p>}
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User name</label>
            {errors.username !== ''&& <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.username}</p>}
        </div>

            </div>
          
          </div>
        <button type="submit" className="w-full text-center py-3 rounded bg-[#234B9A] text-white hover:bg-green-dark focus:outline-none my-2">
          Create Account
        </button>

        <div className="text-grey-dark mt-6">
          Already have an account? {' '}
          <Link to='/login' className="no-underline border-b border-blue text-blue">
            Login
          </Link>
        </div>
        </form>
      </div>
}

export default Signup;