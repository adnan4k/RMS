import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleHouse, removeTenant } from "../api/owner";
import { FaBed, FaToilet, FaArrowsLeftRightToLine } from "react-icons/fa6";
import { AvailableDates } from "../components/AvailableDates";
import { MinimalTenant } from "../components/MinimalTenant"
import { Loader } from "../components/Loader";
import { DisplayBankAccount } from "../components/DisplayBankAccount";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export const SingleHouse = () => {
    const { houseid } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    
    const {data, status} = useQuery({
        queryKey: ['owner-house', houseid],
        queryFn: ()=>getSingleHouse(houseid)
    });
    
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    
    useEffect(() => {
        if (data) {
            setImages(data?.images)
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
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex flex-col space-y-6">
                {/* Header with Edit Button */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">House Details</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                Edit House <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link to="edit/general" state={data}>General Info</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="edit/address" state={{address: data?.address, _id: data?._id}}>Address</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="edit/bank" state={{bankaccounts: data?.bankaccounts, _id: data?._id}}>Bank Accounts</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="edit/images" state={{images: data?.images, _id: data?._id}}>Images</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* House Info Card */}
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    House Number {data?.housenumber}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {data?.address.city}, {data?.address.sub_city}, {data?.address.woreda} 
                                    {data?.address.kebele && ` kebele, ${data?.address.kebele}`}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    House type: {data?.house_type.toUpperCase()}
                                </p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-semibold">
                                    {data?.rent_amount || 0} $
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Per month
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Image Carousel */}
                <Card>
                    <CardContent className="p-6">
                        {images.length > 1 ? (
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
                        ) : (
                            <div className="w-full">
                                {images.map((image, idx) => (
                                    <img 
                                        key={idx} 
                                        src={`http://localhost:4001/${image}`} 
                                        className="w-full h-[400px] object-cover rounded-lg" 
                                        alt="" 
                                    />
                                ))}
                            </div>
                        )}

                        {/* Thumbnail Grid */}
                        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
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
                    </CardContent>
                </Card>

                {/* House Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="p-4 text-center">
                        <FaBed className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-sm">{data?.no_of_rooms} bed rooms</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <FaToilet className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-sm">{data?.no_of_bath_rooms} bath rooms</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <FaArrowsLeftRightToLine className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-sm">{data?.width * data?.length} m<sup>2</sup></p>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Card>
                    <CardContent className="p-6">
                        <Tabs defaultValue={tabIndex.toString()} onValueChange={(value) => setTabIndex(parseInt(value))}>
                            <TabsList className="grid grid-cols-4 w-full">
                                <TabsTrigger value="0">Description</TabsTrigger>
                                <TabsTrigger value="1">Calendar</TabsTrigger>
                                <TabsTrigger value="2">Tenant</TabsTrigger>
                                <TabsTrigger value="3">Bank Accounts</TabsTrigger>
                            </TabsList>
                            <TabsContent value="0">
                                <ul className="list-disc list-inside space-y-2">
                                    {data?.description.split('\n').map((d, i) => 
                                        <li key={i}>{d}</li>
                                    )}
                                </ul>
                            </TabsContent>
                            <TabsContent value="1">
                                <AvailableDates dates={data?.calendar} houseid={data?._id} />
                            </TabsContent>
                            <TabsContent value="2">
                                <MinimalTenant houseId={data?._id} tenant={data?.tenant} />
                            </TabsContent>
                            <TabsContent value="3">
                                <DisplayBankAccount bankaccounts={data?.bankaccounts} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
