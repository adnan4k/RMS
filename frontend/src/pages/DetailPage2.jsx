import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { getSingleHouse } from "../api/house";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight, FaBed, FaToilet, FaArrowsLeftRightToLine } from "react-icons/fa6";
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
        <div className="w-full min-h-full flex justify-center align-center fullh">
            <Loader />
        </div>
        )

    if (status === 'error')
        return (
        <div className="min-w-full fullh flex justify-center items-center">
            <div className="w-64 h-64">
                <MdErrorOutline className="w-full h-full dark:red-300 red-600" />
                <p className="text-center">Page not found!</p>
            </div>
        </div>
        )
    return (
        <div className="flex max-w-full px-8 py-4 fullh rounded-lg">

            <div className="max-w-1/2 max-h-full overflow-y-scroll rounded-l-lg overflow-x-hidden p-8 pt-4 dark:bg-gray-800 flex flex-col">

                <div className="flex justify-between mb-4">
                    <div>
                        <h4>
                            {data.house.house_type.toUpperCase()}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {data.house.address.city}, {data.house.address.sub_city}, {data.house.address.woreda} {data.house.address.kebele && "kebele, "+data.house.address.kebele}
                        </p>
                    </div>
                    <div>
                        <h4>
                            {data.house.rent_amount || 0} $
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Per month
                        </p>
                    </div>
                </div>
                <Slider {...settings} className="min-w-full mx-2 mt-2">
                    {
                        images.map((image, idx) => 
                            
                                <img key={idx} src={"http://localhost:4001/"+image} className="min-h-80 max-h-80 min-w-fill max-w-fill dark:bg-white object-fill rounded-lg" alt="" />
                        )
                    }
                </Slider>
                <div className="mt-2 flex justify-between items-center min-w-256">
                    <div className="flex relative w-[60%] rounded h-full">
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
                    <div className="flex border-dashed p-2 rounded">
                        <div className="flex flex-col items-center ml-2 mr-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                            <FaBed className="min-h-8 min-w-8"/>
                            <span className="text-xs mt-1">{data.house.no_of_rooms} bed rooms</span>
                        </div>
                        <div className="flex flex-col items-center mx-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                            <FaToilet className="min-h-8 min-w-8"/>
                            <span className="text-xs mt-1">{data.house.no_of_bath_rooms} bath rooms</span>
                        </div>
                        <div className="flex flex-col items-center mx-1 min-w-max border-gray-300 bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                            <FaArrowsLeftRightToLine className="min-h-8 min-w-8"/>
                            <span className="text-xs mt-1">{data.house.width * data.house.length} m<sup>2</sup></span>
                        </div>
                    </div>
                </div>
                <div className="flex mt-4 justify-around ">
                    <div onClick={()=>setTabIndex(0)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 0 && 'bg-gray-100 dark:bg-gray-700'}`}>Description</div>
                    <div onClick={()=>setTabIndex(1)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 1 && 'bg-gray-100 dark:bg-gray-700'}`}>Owner Info</div>
                    <div onClick={()=>setTabIndex(2)} className={`hover:bg-gray-100 hover:dark:bg-gray-700 p-2 rounded cursor-pointer ${tabIndex === 2 && 'bg-gray-100 dark:bg-gray-700'}`}>Schedule visit</div>
                </div>
                <div className="border-t border-gray-500 w-3/4 mx-auto my-2"></div>
                <div className="mt-6 min-h-32 mb-4">
                    {tabIndex === 0 && <div className="px-4 font-normal min-h-64">{data.house.description}</div>}
                    {tabIndex === 1 && <MinimalOwner count={data.count} owner={data.house.owner} />}
                    {tabIndex === 2 && <ScheduleVisit calendar={data.house.calendar} id={data.house._id}/>}
                </div>
            </div>
            <div className="min-w-[550px] flex-1 max-h-full rounded-r-lg">
                <HouseMap lat={data.house.address.latitude} lng={data.house.address.longitude} />
            </div>
        </div>
    )
}
