import React from "react";

const AvailableDates = (dates) => {

    if (!dates || dates.length === 0)
        return <div>
            
        </div>


    return ( <div>
        <a href="#" class="flex items-center p-3 mx-6 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <span class="flex-1 ms-3 whitespace-nowrap">MetaMask</span>
            <span>2:00-</span>
            <span>6:00</span>
        </a>
    </div>)
}