import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { getSingleHouse } from "../api/house";
import { FaBed, FaToilet, FaArrowsLeftRightToLine } from "react-icons/fa6";
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
        <div className="w-full min-h-screen flex justify-center items-center">
            <Loader />
        </div>
        )

    if (status === 'error')
        return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-64 h-64">
                <MdErrorOutline className="w-full h-full text-red-600 dark:text-red-300" />
                <p className="text-center">Page not found!</p>
            </div>
        </div>
        )

    return (
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-screen">
            <Card className="p-6 space-y-6 overflow-y-auto">
                {/* Header Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-xl font-semibold">
                            {data.house.house_type.toUpperCase()}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {data.house.address.city}, {data.house.address.sub_city}, {data.house.address.woreda} 
                            {data.house.address.kebele && ` kebele, ${data.house.address.kebele}`}
                        </p>
                    </div>
                    <div className="text-right">
                        <h4 className="text-xl font-semibold">
                            {data.house.rent_amount || 0} $
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Per month
                        </p>
                    </div>
                </div>

                {/* Main Carousel */}
                <Carousel className="w-full">
                    <CarouselContent>
                        {images.map((image, idx) => (
                            <CarouselItem key={idx}>
                                <img 
                                    src={`http://localhost:4001/${image}`}
                                    className="w-full h-[400px] object-cover rounded-lg"
                                    alt=""
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-2 overflow-x-auto">
                    {images.map((image, idx) => (
                        <img
                            key={idx}
                            src={`http://localhost:4001/${image}`}
                            onClick={() => swipeImages(idx, current)}
                            className="h-20 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                            alt=""
                        />
                    ))}
                </div>

                {/* House Features */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 text-center">
                        <FaBed className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-sm">{data.house.no_of_rooms} bed rooms</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <FaToilet className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-sm">{data.house.no_of_bath_rooms} bath rooms</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <FaArrowsLeftRightToLine className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-sm">{data.house.width * data.house.length} m<sup>2</sup></p>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue={tabIndex.toString()} onValueChange={(value) => setTabIndex(parseInt(value))}>
                    <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="0">Description</TabsTrigger>
                        <TabsTrigger value="1">Owner Info</TabsTrigger>
                        <TabsTrigger value="2">Schedule visit</TabsTrigger>
                    </TabsList>
                    <TabsContent value="0">
                        <ul className="list-disc list-inside space-y-2">
                            {data.house.description.split('\n').map((d, i) => 
                                <li key={i}>{d}</li>
                            )}
                        </ul>
                    </TabsContent>
                    <TabsContent value="1">
                        <MinimalOwner count={data.count} owner={data.house.owner} />
                    </TabsContent>
                    <TabsContent value="2">
                        <ScheduleVisit calendar={data.house.calendar} id={data.house._id}/>
                    </TabsContent>
                </Tabs>
            </Card>

            {/* Map Section */}
            <div className="h-[calc(100vh-3rem)] rounded-lg overflow-hidden">
                <HouseMap lat={data.house.address.latitude} lng={data.house.address.longitude} />
            </div>
        </div>
    )
}
