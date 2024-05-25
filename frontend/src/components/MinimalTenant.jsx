import React from "react";
import { Link } from "react-router-dom";

export const MinimalTenant = ({tenant}) => {
    return <Link to={'/'+username}>
        <h6 className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{tenant.email}</h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">{tenant.firstname} {tenant.lastname}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{tenant.phonenumber}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{tenant.username}</p>
    </Link>
}