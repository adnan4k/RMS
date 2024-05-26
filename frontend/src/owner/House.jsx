import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleHouse } from "../api/owner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight, FaBed, FaToilet, FaArrowsLeftRightToLine } from "react-icons/fa6";
import { AvailableDates } from "../components/AvailableDates";


export const SingleHouse = () => {
    const { houseid } = useParams();
    const housePics = useRef(null);
    const [tabIndex, setTabIndex] = useState(0);
    
    const {data, status} = useQuery({
        queryKey: ['owner-house', houseid],
        queryFn: ()=>getSingleHouse(houseid)
    });

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="w-full min-h-full p-8 dark:bg-gray-800">
            <div className="flex justify-between">
                <div>
                    <h4>
                        House Number 1
                    </h4>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Bole, kebele 06, Addis Ababa
                    </p>
                </div>
                <div>
                    <h4>
                        10,000$
                    </h4>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Per month
                    </p>
                </div>
            </div>
            <Slider className="max-w-80 mx-auto">
                <img src="/images/home1.png" className="min-h-full object-fill" alt="" />
                <img src="/images/home1.png" className="min-h-full object-fill" alt="" />
                <img src="/images/home1.png" className="min-h-full object-fill" alt="" />
            </Slider>
            <div className="mt-2 flex justify-between items-center">
                <div className="flex relative max-w-[60%] rounded">
                    <div onClick={() => housePics.current.scrollBy({
                        left: -200,
                        behavior: 'smooth',
                        })}
                        className="top-0 h-full absolute w-4 cursor-pointer flex items-center left-0 bg-gray-600 opacity-0 dark:bg-gray-800 duration-200 ease-in peer-hover:opacity-70 hover:opacity-70">
                        <FaAngleLeft />
                    </div>
                    <div className="flex gap-2 max-w-full overflow-x-scroll peer" ref={housePics}>
                        <img src="/images/home1.png" className="max-h-16 rounded-sm" alt="" />
                        <img src="/images/home1.png" className="max-h-16" alt="" />
                        <img src="/images/home1.png" className="max-h-16" alt="" />
                        <img src="/images/home1.png" className="max-h-16" alt="" />
                        <img src="/images/home1.png" className="max-h-16" alt="" />
                        <img src="/images/home1.png" className="max-h-16" alt="" />
                        <img src="/images/home1.png" className="max-h-16" alt="" />
                        <img src="/images/home1.png" className="max-h-16" alt="" />
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
                        <span className="text-xs mt-1">5 bed rooms</span>
                    </div>
                    <div className="flex flex-col items-center mx-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                        <FaBed className="min-h-8 min-w-8"/>
                        <span className="text-xs mt-1">5 bed rooms</span>
                    </div>
                    <div className="flex flex-col items-center mx-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                        <FaBed className="min-h-8 min-w-8"/>
                        <span className="text-xs mt-1">5 bed rooms</span>
                    </div>
                </div>
            </div>
            <div className="flex mt-4 justify-around">
                <div onClick={()=>setTabIndex(0)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 0 && 'bg-gray-100 dark:bg-gray-700'}`}>Description</div>
                <div onClick={()=>setTabIndex(1)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 1 && 'bg-gray-100 dark:bg-gray-700'}`}>Calendar</div>
                <div onClick={()=>setTabIndex(2)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 2 && 'bg-gray-100 dark:bg-gray-700'}`}>Tenant</div>
            </div>
            <div className="mt-6">
                <AvailableDates />
            </div>
        </div>
    )
}
