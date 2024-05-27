import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editHouse } from "../api/owner";
import { useQueryClient } from "@tanstack/react-query"
import AddressData from "./addressData";


export const EditHouseAddress = () => {
    const {state} = useLocation();
    const address = state.address

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate} = useMutation({
        mutationFn: editHouse,
        onSuccess: (house) => {
            queryClient.invalidateQueries({
                queryKey: ['onwer-house', state._id]
            });
            toast.success('Successfully updated')
            navigate('/owner/'+state._id)
        },
        onError: (error) => {console.log(error);toast.error(error.response?error.response.data:"Something went wrong")}
    })

    const [addressData, setAddressData] = useState({
        city: address.city,
        sub_city: address.sub_city,
        kebele: address.kebele,
        woreda: address.woreda,
        longitude: address.longitude,
        latitude: address.latitude,
    });

    const onClick = () => {
        console.log(addressData)
        mutate({address: addressData, houseid: state._id})
    }
    

    return (<div className="h-full flex flex-col justify-start overflow-scroll py-8">
        <AddressData addressData={addressData} setAddressData={setAddressData}/>
        <button type="button" onClick={onClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit address</button>
    </div>
    )
}