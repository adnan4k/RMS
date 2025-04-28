import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { getSingleHouse } from "../api/house";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { 
  FaBed, 
  FaToilet, 
  FaArrowsAltH, 
  FaMapMarkerAlt, 
  FaHome, 
  FaDollarSign, 
  FaFileAlt,
  FaInfoCircle,
  FaCalendarCheck
} from "react-icons/fa";
import { Loader } from "../components/Loader";
import { MdErrorOutline } from "react-icons/md";
import { MinimalOwner } from "../components/MinimalOwner";
import HouseMap from "../components/HouseMap";
import ScheduleVisit from "../components/ScheduleVisit";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    
    const swipeImages = (idx) => {
        setCurrent(idx)
    }

    if(status === 'pending')
        return (
        <div className="w-full min-h-full flex justify-center items-center fullh">
            <Loader />
        </div>
        )

    if (status === 'error')
        return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-64 h-64">
                <MdErrorOutline className="w-full h-full text-red-600 dark:text-red-400" />
                <p className="text-center font-semibold">Page not found!</p>
            </div>
        </div>
        )

    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-gray-50 dark:bg-gray-800 mx-auto">
            {/* Main Container */}
            <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
                {/* Left Section - House Details */}
                <div className="flex-1 bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden">
                    {/* Header with House Type and Price */}
                    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 border-b dark:border-gray-600">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                            <FaHome className="mr-2 text-blue-500" />
                            {data.house.house_type.toUpperCase()}
                        </h1>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800 px-4 py-2 rounded-lg text-gray-100">
                            <div className="flex items-center">
                                <FaDollarSign className="text-xl mr-1" />
                                <span className="text-xl font-bold">{data.house.rent_amount || 0}</span>
                                <span className="text-xs ml-1">/month</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-4 md:p-6">
                        {/* Address */}
                        <div className="bg-blue-50 dark:bg-gray-600 p-4 rounded-lg mb-6 flex items-start">
                            <FaMapMarkerAlt className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">
                                {data.house.address.city}, {data.house.address.sub_city}, {data.house.address.woreda} {data.house.address.kebele && "kebele, "+data.house.address.kebele}
                            </p>
                        </div>

                        {/* Image Carousel */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
                            <Carousel
                                showArrows={true}
                                onChange={setCurrent}
                                selectedItem={current}
                                showStatus={false}
                                showThumbs={false}
                                infiniteLoop={true}
                                className="min-w-full"
                                renderArrowPrev={(clickHandler, hasPrev) =>
                                    hasPrev && (
                                        <button
                                            type="button"
                                            onClick={clickHandler}
                                            className="absolute left-0 z-10 bg-black bg-opacity-50 p-2 rounded-r-md top-1/2 transform -translate-y-1/2"
                                            aria-label="Previous slide"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                    )
                                }
                                renderArrowNext={(clickHandler, hasNext) =>
                                    hasNext && (
                                        <button
                                            type="button"
                                            onClick={clickHandler}
                                            className="absolute right-0 z-10 bg-black bg-opacity-50 p-2 rounded-l-md top-1/2 transform -translate-y-1/2"
                                            aria-label="Next slide"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    )
                                }
                            >
                                {images.map((image, idx) => (
                                    <div key={idx} className="relative">
                                        <img 
                                            src={"http://localhost:4001/"+image} 
                                            className="h-[350px] md:h-[450px] w-full object-cover dark:bg-gray-600" 
                                            alt={`House view ${idx+1}`} 
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16 opacity-60"></div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex mb-6 overflow-x-auto px-2 py-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                            <div className="flex gap-3 items-center mx-auto" ref={housePics}>
                                {images.map((image, idx) => (
                                    <img 
                                        key={idx} 
                                        src={"http://localhost:4001/"+image} 
                                        onClick={() => swipeImages(idx)} 
                                        className={`h-16 w-16 md:h-20 md:w-20 object-cover rounded-md cursor-pointer transition-all duration-200 ${
                                            current === idx ? 'ring-2 ring-blue-500 shadow-md scale-105' : 'opacity-80 hover:opacity-100 hover:ring-1 hover:ring-blue-400'
                                        }`} 
                                        alt={`Thumbnail ${idx+1}`} 
                                    />
                                ))}
                            </div>
                        </div>

                        {/* House Features */}
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-600 rounded-lg">
                                    <FaBed className="text-blue-500 text-xl mb-2" />
                                    <p className="text-center text-sm font-medium">
                                        {data.house.no_of_rooms}{' '}
                                        <span className="text-gray-300 dark:text-gray-400">
                                            Bedroom{data.house.no_of_rooms !== 1 ? 's' : ''}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-600 rounded-lg">
                                    <FaToilet className="text-blue-500 text-xl mb-2" />
                                    <p className="text-center text-sm font-medium">
                                        {data.house.no_of_bath_rooms}{' '}
                                        <span className="text-gray-300 dark:text-gray-400">
                                            Bathroom{data.house.no_of_bath_rooms !== 1 ? 's' : ''}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-600 rounded-lg">
                                    <FaArrowsAltH className="text-blue-500 text-xl mb-2" />
                                    <p className="text-center text-sm font-medium">
                                        {data.house.width * data.house.length}{' '}
                                        <span className="text-gray-300 dark:text-gray-400">
                                            m<sup>2</sup>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tab Section */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600">
                            {/* Tab Navigation */}
                            <div className="flex border-b dark:border-gray-600">
                                <button
                                    onClick={() => setTabIndex(0)}
                                    className={`flex items-center justify-center py-3 px-4 text-center transition-all font-medium flex-1 ${
                                        tabIndex === 0
                                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <FaFileAlt
                                        className={`mr-2 ${tabIndex === 0 ? 'text-blue-500' : 'text-gray-400'}`}
                                    />
                                    Description
                                </button>
                                <button
                                    onClick={() => setTabIndex(1)}
                                    className={`flex items-center justify-center py-3 px-4 text-center transition-all font-medium flex-1 ${
                                        tabIndex === 1
                                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <FaInfoCircle
                                        className={`mr-2 ${tabIndex === 1 ? 'text-blue-500' : 'text-gray-400'}`}
                                    />
                                    Owner Info
                                </button>
                                <button
                                    onClick={() => setTabIndex(2)}
                                    className={`flex items-center justify-center py-3 px-4 text-center transition-all font-medium flex-1 ${
                                        tabIndex === 2
                                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <FaCalendarCheck
                                        className={`mr-2 ${tabIndex === 2 ? 'text-blue-500' : 'text-gray-400'}`}
                                    />
                                    Schedule Visit
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="p-5 min-h-[250px]">
                                {tabIndex === 0 && (
                                    <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700 dark:text-gray-200">
                                        {data.house.description.split('\n').map((d, idx) => (
                                            <li key={idx} className="leading-relaxed">{d}</li>
                                        ))}
                                    </ul>
                                )}
                                {tabIndex === 1 && <MinimalOwner count={data.count} owner={data.house.owner} />}
                                {tabIndex === 2 && <ScheduleVisit calendar={data.house.calendar} id={data.house._id}/>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Map */}
                <div className="lg:w-[40%] h-auto lg:h-auto rounded-xl overflow-hidden shadow-md">
                    <div className="h-full min-h-[400px] lg:min-h-[600px]">
                        <HouseMap lat={data.house.address.latitude} lng={data.house.address.longitude} />
                    </div>
                </div>
            </div>
        </div>
    );
};
