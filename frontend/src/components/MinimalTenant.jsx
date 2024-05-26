import React from "react";
import { Link } from "react-router-dom";

export const MinimalTenant = ({tenant}) => {
    if (!tenant || Object.keys(tenant).length === 0)
        return <div className="m-auto text-xl w-fit">
                No tenants assigned yet
            </div>
    return <Link to={'/'+tenant.username}>
        <h6 className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">Email: {tenant.email}</h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">Full name: {tenant.firstname} {tenant.lastname}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">Phone number: {tenant.phonenumber}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">Username: {tenant.username}</p>
    </Link>
}