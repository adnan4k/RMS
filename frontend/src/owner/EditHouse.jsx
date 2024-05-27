import React, { useState } from "react";
import HouseForm from "./HouseForm";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editHouse } from "../api/owner";

export const EditHouse = () => {
    const {state} = useLocation();
    const {mutate} = useMutation({
        mutationFn: editHouse,
        onSuccess: (house) => toast.success('Successfully updated'),
        onError: (error) => {console.log(error);toast.error(error.response?error.response.data:"Something went wrong")}
    })

    const [houseData, setHouseData] = useState({
        housenumber: state.housenumber,
        no_of_rooms: state.no_of_rooms,
        no_of_bath_rooms: state.no_of_bath_rooms,
        length: state.length,
        width: state.width,
        rent_amount: state.rent_amount,
        description: state.description,
    });

    const [selectedOption, setSelectedOption] = useState(state.house_type);
    const [showDropDown, setShowDropDown] = useState(false);
    const onClick = () => {
        mutate({...houseData, house_type:selectedOption, houseid: state._id})
    }


    return (<div>
        <HouseForm houseData={houseData} setHouseData={setHouseData} selectedOption={selectedOption} setSelectedOption={setSelectedOption} showDropDown={showDropDown} setShowDropDown={setShowDropDown} edit/>
        <button type="button" onClick={onClick} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
    </div>
    )
}