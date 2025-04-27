import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { getSingleHouse } from "../api/house";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaBed, FaToilet, FaArrowsAltH, FaMapMarkerAlt, FaHome, FaDollarSign } from "react-icons/fa";
import { Loader } from "../components/Loader";
import { MdErrorOutline } from "react-icons/md";
import { MinimalOwner } from "../components/MinimalOwner";
import HouseMap from "../components/HouseMap";
import ScheduleVisit from "../components/ScheduleVisit";

export const DetailHouse2 = () => {
    const {state} = useLocation();

    const { houseid } = useParams();
    const housePics = useRef(null);
    const [tabIndex, setTabIndex] = useState(state || 0);
    const [images, setImages] = useState([]);
    
    const {data, status, error} = useQuery({
        queryKey: ['house', houseid],
        queryFn: ()=>getSingleHouse(houseid)
    });

    const [current, setCurrent] = useState(0);
    
    useEffect(() => {
        if (data && data.house) {
            const i = data.house.images;
            if (i.length < 2)
                i.push(i[0]) 
            setImages(i)
        }
    }, [data, status]);
    
    const swipeImages = (idx, current) => {
        [images[current], images[idx]] = [images[idx], images[current]]
        setImages([...images])
    }

    if(status === 'pending')
        return (
        <div className="w-full min-h-full flex justify-center items-center fullh">
            <Loader />
        </div>
        )

    if (status === 'error')
        return (
        <div className="min-w-full fullh flex justify-center items-center">
            <div className="w-64 h-64">
                <MdErrorOutline className="w-full h-full text-red-600 dark:text-red-400" />
                <p className="text-center font-semibold">Page not found!</p>
            </div>
        </div>
        )
    return (
        <div className="flex max-w-full p-6 fullh rounded-lg">
            <div className="max-w-1/2 max-h-full overflow-y-scroll rounded-lg overflow-x-hidden p-6 dark:bg-gray-800 bg-white flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 border-b pb-4">
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-2">
                            <FaHome className="text-blue-500 mr-2" />
                            <h3 className="font-medium">{data.house.house_type.toUpperCase()}</h3>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaMapMarkerAlt className="text-blue-500 mr-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {data.house.address.city}, {data.house.address.sub_city}, {data.house.address.woreda} {data.house.address.kebele && "kebele, "+data.house.address.kebele}
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Rent</p>
                        <div className="flex items-center justify-center">
                            <FaDollarSign className="text-green-500" />
                            <h3 className="text-2xl font-bold">{data.house.rent_amount || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
                    <Carousel
                        showArrows={true}
                        onChange={setCurrent}
                        selectedItem={current}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                    >
                        {images.map((image, idx) => (
                            <div key={idx}>
                                <img 
                                    src={"http://localhost:4001/"+image} 
                                    className="h-[350px] w-full object-cover dark:bg-gray-600" 
                                    alt={`House view ${idx+1}`} 
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="flex mb-6 overflow-x-auto">
                    <div className="flex gap-2 items-center" ref={housePics}>
                        {images.map((image, idx) => (
                            <img 
                                key={idx} 
                                src={"http://localhost:4001/"+image} 
                                onClick={() => swipeImages(idx, current)} 
                                className={`h-16 w-16 object-cover rounded-md cursor-pointer border-2 ${
                                    current === idx ? 'border-blue-500' : 'border-transparent'
                                }`} 
                                alt="" 
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-around bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="text-center">
                        <FaBed className="mx-auto h-6 w-6 text-blue-500 mb-1" />
                        <p className="text-sm">{data.house.no_of_rooms} Bedroom{data.house.no_of_rooms !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-center">
                        <FaToilet className="mx-auto h-6 w-6 text-blue-500 mb-1" />
                        <p className="text-sm">{data.house.no_of_bath_rooms} Bathroom{data.house.no_of_bath_rooms !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-center">
                        <FaArrowsAltH className="mx-auto h-6 w-6 text-blue-500 mb-1" />
                        <p className="text-sm">
                            {data.house.width * data.house.length} m<sup>2</sup>
                        </p>
                    </div>
                </div>

                <div className="border rounded-lg mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setTabIndex(0)}
                            className={`flex-1 py-3 px-4 text-center ${
                                tabIndex === 0 ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setTabIndex(1)}
                            className={`flex-1 py-3 px-4 text-center ${
                                tabIndex === 1 ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            Owner Info
                        </button>
                        <button
                            onClick={() => setTabIndex(2)}
                            className={`flex-1 py-3 px-4 text-center ${
                                tabIndex === 2 ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            Schedule visit
                        </button>
                    </div>

                    <div className="p-4 min-h-64">
                        {tabIndex === 0 && (
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                {data.house.description.split('\n').map((d, idx) => (
                                    <li key={idx} className="text-gray-700 dark:text-gray-200">{d}</li>
                                ))}
                            </ul>
                        )}
                        {tabIndex === 1 && <MinimalOwner count={data.count} owner={data.house.owner} />}
                        {tabIndex === 2 && <ScheduleVisit calendar={data.house.calendar} id={data.house._id}/>}
                    </div>
                </div>
            </div>
            <div className="min-w-[550px] flex-1 max-h-full rounded-lg overflow-hidden shadow-md">
                <HouseMap lat={data.house.address.latitude} lng={data.house.address.longitude} />
            </div>
        </div>
    )
}
