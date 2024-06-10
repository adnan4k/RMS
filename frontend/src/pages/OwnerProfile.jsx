import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { download } from "../utils/downloadImage";
import {fetchOwner} from '../api/tenant'

const OwnerProfile = () => {
    const [hide, setHide] = useState(true);
    
    const {data} = useQuery({
        queryKey: ['tenant', 'owner'],
        queryFn: fetchOwner
    });
    const {data:url, status} = useQuery({
        enabled: data !== null,
        queryKey: ['owner', 'national_id'],
        queryFn: () => download(data.owner.national_id)
    });
    
    let fullname = ''
    if (data) 
        fullname = `${data.user.firstname}  ${data.user.lastname}`

    let address = ''
    if (data.owner)
        address = `${data.address.city}, ${data.address.sub_city}`
    const woreda = data? data.owner.address.woreda : ''
    const kebele = data && data.owner.address.kebele || ''
    
    return (
        <div className="min-w-[23rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 self-center mx-auto px-5 text-center py-5">
            {data&&
            <div className="flex flex-col items-center pb-10">
                {status === 'success' ? 
                    <div className="w-[100%] h-64 mb-3 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-600">
                        <img src={url} className="w-full h-full" />    
                    </div>
                    :
                    <div className="w-24 h-24 mb-3 rounded-full shadow-lg overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="m-auto w-20 h-20 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                }
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{fullname}</h5>
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Email: {data.user.email}</span>
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Username: {data.user.username}</span>
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Phone: {data.user.phonenumber}</span>
                {data.owner && 
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Address: {address}</span>
                }
                {data.owner && 
                <span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Woreda: {woreda}</span>
                }
                {kebele&&<span className="text-l text-gray-700 dark:text-gray-100 self-start my-2">Kebele: {kebele}</span>}

                <div className="flex mt-4 md:mt-6 w-full justify-around">

                </div>
            </div>
            }
        </div>
        )
}

export default OwnerProfile
