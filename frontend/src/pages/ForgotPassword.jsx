import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {frogetPassword} from '../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [tryagain, setTryagain] = useState(false);

  const mutation = useMutation({
    mutationFn: frogetPassword,
    onError: err => {
      setSuccess(false)
      setError(err.data.message)
    },
    onSuccess: res => {
      setTryagain(true)
      setSuccess(true)
    }
  });

  useEffect(() => {
    if(tryagain) {
      setTimeout(() => {
        setTryagain(false)
      }, 60000);
    }
  }, [success]);

// Once an email is sent the button should be disabled for some time prompting them to check their inboxes
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forget password page
            </h1>
            <form
              className="space-y-4 text-center md:space-y-6"
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(email)
              }}
            >
                <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Forgot your password? No worries! Just enter your email below, and we'll send you a password reset link. Check your inbox (and possibly your spam folder) for further instructions.</p>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
                >
                  Please enter your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                {tryagain && <p class="mt-2 text-xs text-green-600 dark:text-green-500">We have sent a password reset link to the above email. Please check your inbox and if you didn't recieve the email yet try again</p>}
              <button
                type="submit"
                className={"w-full text-white  bg-[#234B9A] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "+tryagain&&'disable'}
              >
                {success ? 'Resend email': 'Recieve Email'}
              </button>
              </form>
          </div>
        </div>
      </div>
    </section>  
  );

} 


export default ForgotPassword;
