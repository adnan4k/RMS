import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHouses } from "../api/owner";
import { Loader } from "../components/Loader";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { FaDropbox } from "react-icons/fa";

export const Houses = () => {

    const { data, status, error } = useQuery({
        queryKey: ['houses'],
        queryFn: getHouses,
    });

    if (status === 'pending')
        return (
            <div className="w-full h-full flex justify-center align-center">
                <Loader />
            </div>
        )
    if (error)
        toast.error(error.data.message)

    if (!data || data.length === 0)
        return (
            <div className="w-64 h-64">
                <FaDropbox className="w-full h-full" />
                <p className="text-center">No houses found! <Link to='create-house'> Create new house </Link></p>
            </div>
        )

    return (
        <div className="grid gap-10 grid-cols-3 mx-10 self-start mt-4">
            {data.map((house, idx) => {
                const image = house.images.length > 0 ? 'http://localhost:4001/' + house.images[0] : '/images/home1.png';
                return <div key={idx} className="container flex flex-col">
                    <div className="grow">
                        <Link  to={house._id} >
                            <img src={image} alt="home" className="min-h-full max-h-full rounded" />
                        </Link>
                    </div>
                    <div className="my-2 grow-0">
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">House no: </span> <span className="font-semibold text-sm">{house.housenumber}</span></h3>
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">Number of rooms: </span> <span className="font-semibold text-sm">{house.no_of_rooms}</span></h3>
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">Number of bath rooms: </span> <span className="font-semibold text-sm">{house.no_of_bath_rooms}</span></h3>
                        <h3><span className="text-[#081E4A] text-[12px] mx-2 font-semibold dark:text-white">Type: </span> <span className="font-semibold text-sm">{house.house_type}</span></h3>
                        <h3><span className="text-[#081E4A] mx-2 text-[12px] font-semibold dark:text-white">Location: </span> <span className="font-semibold text-sm">{house.address.city}, {house.address.sub_city}</span> </h3>
                        <h3><span className="text-[#081E4A] mb-5  mx-2 text-[12px] font-semibold dark:text-white">Area: </span> <span className="font-semibold text-sm">{house.width} <sup>2</sup></span></h3>

                    </div>
                    <Link to="create-tenants"
                        state={{ houseId: house._id}} 
                        className=" my-[15px] text-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Tenant</Link>

                </div>
            }
            )}
        </div>
    )
}