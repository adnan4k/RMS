import React from "react";

export const HouseProgress = ({idx}) => {
    return (
        <ol className="flex items-center w-full justify-center my-4">
        <li className={`flex items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:duration-400 after:border-b after:border-4 after:inline-block duration-400 after:opacity-0 after ${idx < 1?'after:border-gray-100 dark:after:border-gray-700': 'after:border-blue-100 dark:after:border-blue-800 after:opacity-100'}`}>
            <span className="flex items-center justify-center bg-blue-100 dark:text-white rounded px-1 dark:bg-blue-800">
                House Information
            </span>
        </li>
        <li className={`flex items-center after:content-[''] after:w-full after:h-1 after:border-b after:duration-400 after:border-4 after:inline-block after:opacity-0 ${idx < 2?'after:border-gray-100 dark:after:border-gray-700': ' after:border-blue-100 dark:after:border-blue-800 after:opacity-100'}`}>
            <span className={`flex items-center justify-center dark:text-white rounded px-1 duration-300 opacity-0 ${idx > 0?'dark:bg-blue-800 bg-blue-100 opacity-100': 'dark:bg-gray-700 bg-gray-100'}`}>
                Address Information
            </span>
        </li>
        <li className="flex items-center min-w-min">
            <span className={`flex flex-col justify-center dark:text-white rounded px-1 duration-300 opacity-0 ${idx > 1?'dark:bg-blue-800 bg-blue-100 opacity-100': 'dark:bg-gray-700 bg-gray-100'}`}>
                <span>Bank Account</span> <span>Information</span>
            </span>
        </li>
        </ol>
    )
}