import dayjs from 'dayjs';
import {HouseCard} from '../components/HouseCard';
import { Modal } from "@mui/material";
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeStatus, getMaintenance, getVisitors } from '../api/owner';
import { Loader } from '../components/Loader';
import { FaDropbox } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const VisitorRequests = () => {
    const [open, setOpen] = useState(false);
    const [requests, setRequests] = useState(null);

    const {data, status, error} = useQuery({
        queryKey: ['owner', 'visitors'],
        queryFn: getVisitors
    })

    
    if (status === 'pending')
        return (
            <div className="w-full h-full flex justify-center align-center">
                <Loader />
            </div>
        )

    if (error)
        toast.error(error.response ? error.response.data.message:error.message)

    if (!data || data.length === 0)
        return (
            <div className="w-64 h-64">
                <FaDropbox className="w-full h-full" />
                <p className="text-center">No maintenance requests yet</p>
            </div>
        )

    return <div className="grid gap-10 grid-cols-3 mx-10 self-start mt-4">
        {data.map(({house, requests}, idx) => 
            <HouseCard {...house} requests={requests} onClick={setOpen} setRequests={setRequests} key={idx} req/>
        )}
        

        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="max-w-full p-4 bg-white border border-gray-200 rounded-lg mx-8 my-8 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Visitor requests</h5>
                </div>
            <div className="flow-root overflow-scroll max-h-[500px]">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {requests && requests.map(({visitor, message, fname, lname, date, request_id}, idx) =>
                        <li key={idx} className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-1 min-w-0 ms-4">
                                    <Link to={'/user/'+visitor} className="text-lg font-medium truncate text-gray-900 dark:text-white">
                                        {fname} {lname}
                                    </Link>
                                    <p className="text text-gray-500 dark:text-gray-400">
                                        {message}    
                                    </p>
                                </div>
                                <div className="inline-flex items-center ml-4 text-base font-semibold text-gray-900 dark:text-white h-full">
                                <div className='flex flex-col justify-between'>
                                    <div>
                                        <p className="text mb-3 text-gray-500 truncate font-medium dark:text-gray-400">
                                            Schedule: {dayjs(date).format("DD/MMM/YYYY HH:mm A")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            </div>

        </Modal>
    </div>
}
