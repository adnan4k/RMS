import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleHouse } from "../api/owner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight, FaBed, FaToilet, FaArrowsLeftRightToLine } from "react-icons/fa6";
import { AvailableDates } from "../components/AvailableDates";
import { MinimalTenant } from "../components/MinimalTenant"
import { Loader } from "../components/Loader";

export const SingleHouse = () => {
    const { houseid } = useParams();
    const housePics = useRef(null);
    const [tabIndex, setTabIndex] = useState(0);
    
    const {data, status} = useQuery({
        queryKey: ['owner-house', houseid],
        queryFn: ()=>getSingleHouse(houseid)
    });

    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: current => {
            setCurrent(current);
        },
    };

    useEffect(() => {
        if (data) {
            setImages(data.images)
        }
    }, [data, status]);

    const swipeImages = (idx, current) => {
        [images[current], images[idx]] = [images[idx], images[current]]
        setImages([...images])
    }

    if(status === 'pending')
        return (
            <div className="w-full h-full flex justify-center align-center">
                <Loader />
            </div>
        )
    console.log(data)
    return (
        <div className="w-full h-full overflow-y-scroll p-8 dark:bg-gray-800 mx-32">
            <div className="flex justify-between mb-4">
                <div>
                    <h4>
                        House Number {data.housenumber}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {data.address.city}, {data.address.sub_city}, {data.address.woreda} kebele {data.address.kebele}
                    </p>
                </div>
                <div>
                    <h4>
                        {data.rentamount || 0}$
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Per month
                    </p>
                </div>
            </div>
            <Slider {...settings} className="max-w-80 mx-auto mt-2">
                {
                    images.map((image, idx) => 
                        <img key={idx} src={"http://localhost:4001/"+image} className="min-h-80 max-h-80 min-w-fill max-w-fill dark:bg-white object-fill rounded-lg" alt="" />
                    )
                }
            </Slider>
            <div className="mt-2 flex justify-between items-center min-w-256">
                <div className="flex relative w-[60%] rounded">
                    <div className="flex gap-2 w-full overflow-x-scroll peer" ref={housePics}>
                    {
                        images.map((image, idx) => 
                            <img key={idx} src={"http://localhost:4001/"+image} onClick={() => swipeImages(idx, current)} className="min-h-full max-h-16 max-w-16 min-w-16 dark:bg-white rounded max-h-16 object-fill" alt="" />
                        )
                    }
                    </div>
                    <div onClick={() => housePics.current.scrollBy({
                        left: -200,
                        behavior: 'smooth',
                        })}
                        className="top-0 h-full absolute w-4 cursor-pointer flex items-center left-0 bg-gray-600 opacity-0 dark:bg-gray-800 duration-200 ease-in peer-hover:opacity-70 hover:opacity-70">
                        <FaAngleLeft />
                    </div>
                    <div onClick={() => housePics.current.scrollBy({
                        left: 200,
                        behavior: 'smooth',
                        })} 
                        className="top-0 h-full cursor-pointer absolute w-4 flex items-center right-0 bg-gray-600 opacity-0 dark:bg-gray-800 duration-200 ease-in peer-hover:opacity-70 hover:opacity-70">
                        <FaAngleRight />
                    </div>
                </div>
                <div className="flex border-dashed rounded">
                    <div className="flex flex-col items-center ml-2 mr-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                        <FaBed className="min-h-8 min-w-8"/>
                        <span className="text-xs mt-1">{data.no_of_rooms} bed rooms</span>
                    </div>
                    <div className="flex flex-col items-center mx-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                        <FaToilet className="min-h-8 min-w-8"/>
                        <span className="text-xs mt-1">{data.no_of_bath_rooms} bath rooms</span>
                    </div>
                    <div className="flex flex-col items-center mx-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                        <FaArrowsLeftRightToLine className="min-h-8 min-w-8"/>
                        <span className="text-xs mt-1">{data.width * data.length} m<sup>2</sup></span>
                    </div>
                </div>
            </div>
            <div className="flex mt-4 justify-around">
                <div onClick={()=>setTabIndex(0)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 0 && 'bg-gray-100 dark:bg-gray-700'}`}>Description</div>
                <div onClick={()=>setTabIndex(1)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 1 && 'bg-gray-100 dark:bg-gray-700'}`}>Calendar</div>
                <div onClick={()=>setTabIndex(2)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 2 && 'bg-gray-100 dark:bg-gray-700'}`}>Tenant</div>
            </div>
            <div className="mt-6">
                {tabIndex === 0 && <div className="px-4 font-normal">
                        {data.description}
                </div>}
                {tabIndex === 1 && <AvailableDates dates={data.calendar} />}
                {tabIndex === 2 && <MinimalTenant tenant={data.tenant} />}
            </div>
        </div>
    )
}
