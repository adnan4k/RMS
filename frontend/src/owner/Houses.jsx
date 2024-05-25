import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHouses } from "../api/owner";
import { Loader } from "../components/Loader";
import {Link} from "react-router-dom"
import { toast } from "react-toastify";
import { FaDropbox } from "react-icons/fa";

export const Houses = () => {

    const {data, status, error} = useQuery({
        queryKey: ['houses'],
        queryFn: getHouses,
    });

    if(status === 'pending')
        return (
            <div className="w-full h-full flex justify-center align-center">
                <Loader />
            </div>
        )
    if(error)
        toast.error(error.data.message)

    if (!data || data.length === 0)
        return (
            <div className="w-64 h-64">
                <FaDropbox className="w-full h-full"/>
                <p className="text-center">No houses found! <Link to='create-house'> Create new house </Link></p>
            </div>
        )

    return (
        <div className="grid gap-10 grid-cols-3 mx-10 self-start mt-4">
            {data.map((house, idx) => 
                {
                    const image = house.images.length>0? 'http://localhost:4001/'+house.images[0] : '/images/home1.png';
                return <Link key={idx} to={house._id}  className="container flex flex-col">
                    <div className="grow"> 
                        <img src={image} alt="home" className="min-h-full max-h-full rounded" />
                    </div>
                    <div className="my-2 grow-0">
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">House no: </span> <span className="font-semibold text-sm">{house.housenumber}</span></h3>
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">Number of rooms: </span> <span className="font-semibold text-sm">{house.no_of_rooms}</span></h3>
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">Number of bath rooms: </span> <span className="font-semibold text-sm">{house.no_of_bath_rooms}</span></h3>
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">Type: </span> <span className="font-semibold text-sm">{house.house_type}</span></h3>
                        <h3><span className="text-[#081E4A] mx-2 text-[12px] font-semibold dark:text-white">Location: </span> <span className="font-semibold text-sm">{house.address.city}, {house.address.sub_city}</span> </h3>
                        <h3><span className="text-[#081E4A] mx-2 text-[12px] font-semibold dark:text-white">Area: </span> <span className="font-semibold text-sm">{house.width} <sup>2</sup></span></h3>
                    </div>
                </Link>
                }
            )}
        </div>
    )
}