import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { frogetPassword, getUser } from "../api/auth";
import { toast } from "react-toastify";

const Profile = () => {
    const navigate = useNavigate();
    const {data, status} = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    });
    const {mutate, isPending, status:changeStatus} = useMutation({
        mutationFn: frogetPassword,
        onSuccess: (data) => {
            toast.success('We have sent a password reset link to: '+data.email)
        },
        onError: (error) => {
            console.log('here', error)
            toast.error('Something went wrong')
        }
    });

    useEffect(()=> {
        if(status === 'error')
            navigate('/')
    }, [status]);
    
    let fullname = ''
    if (data) 
        fullname = `${data.firstname}  ${data.lastname}`
    
    return (
        <div className="min-w-[23rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 self-center pl-5 text-center py-5">
            {
            status === 'pending'?
            <svg aria-hidden="true" role="status" className="m-auto inline w-24 h-24 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            :
            <div className="flex flex-col items-center pb-10">
                <div className="w-24 h-24 mb-3 rounded-full shadow-lg overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="m-auto w-20 h-20 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{fullname}</h5>
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Email: {data.email}</span>
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Username: {data.username}</span>
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Phone: {data.phonenumber}</span>
                <div className="flex mt-4 md:mt-6 w-full justify-around">
                    <Link to="edit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Edit Profile</Link>
                    <button onClick={(e)=> {e.preventDefault();mutate(data.email)}} className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isPending&&'cursor-not-allowed'}`} disabled={isPending}>{isPending?'...':'Change Password'}</button>
                </div>
            </div>
            }
        </div>
        )
}

export default Profile
