import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query' 
import { logout } from "../api/auth";
import {toast} from 'react-toastify';

const showProfile = ({username}) => {
    const queryClient = useQueryClient();
    const [hide, sethide] = useState(true);
    const {mutate, status} = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            toast.success('Successfully Logged out!')
            sethide(true)
        }
    })
    
    const handleLogout = () => {
        mutate();
    } 
    
    return (
        <div className="flex-col relative">
        <button type="button" className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => sethide(!hide)}>
            {username}
        </button>
        
        <div className={"z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute w-full "+(hide&&'hidden')}>
            <ul className="py-2 font-medium" role="none">
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div className="inline-flex items-center">
                        Profile
                    </div>
                    </a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={handleLogout}>
                    <div className="inline-flex items-center">
                        Log out
                    </div>
                    </a>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default showProfile