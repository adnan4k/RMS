import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHouses } from '../api/owner';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaDropbox,
  FaHome,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaPlusCircle,
} from 'react-icons/fa';

export const Houses = () => {
  const { data, status, error } = useQuery({
    queryKey: ['owner-houses'],
    queryFn: getHouses,
  });

  if (status === 'pending')
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="text-center p-8 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <FaDropbox className="w-24 h-24 mx-auto text-indigo-500 dark:text-indigo-400 mb-4 opacity-80" />
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">No Houses Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You haven't added any properties yet. Start managing your real estate portfolio by
            adding your first house.
          </p>
          <Link
            to="create-house"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            <FaPlusCircle className="mr-2" /> Add New House
          </Link>
        </div>
      </div>
    );

  return (
    <div className="p-6 w-full bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Properties</h1>
        <Link
          to="create-house"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm"
        >
          <FaPlusCircle className="mr-2" /> Add New House
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((house, idx) => {
          const image =
            house.images.length > 0
              ? 'http://localhost:4001/' + house.images[0]
              : '/images/home1.png';
          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
            >
              <Link to={house._id} className="block relative overflow-hidden group">
                <div className="aspect-w-16 aspect-h-10 w-full">
                  <img
                    src={image}
                    alt={`House ${house.housenumber}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-0 right-0 bg-indigo-600 bg-opacity-85 text-white py-1 px-3 text-sm font-semibold rounded-bl-lg">
                  #{house.housenumber}
                </div>
              </Link>

              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {house.house_type.toUpperCase()}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      house.tenant
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    }`}
                  >
                    {house.tenant ? 'Rented' : 'Available'}
                  </span>
                </div>

                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                  <FaMapMarkerAlt className="mr-1 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-sm truncate">
                    {house.address.city}, {house.address.sub_city}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex flex-col items-center p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                      <FaBed className="mr-1" />
                      <span className="font-semibold">{house.no_of_rooms}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Beds</span>
                  </div>

                  <div className="flex flex-col items-center p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                      <FaBath className="mr-1" />
                      <span className="font-semibold">{house.no_of_bath_rooms}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Baths</span>
                  </div>

                  <div className="flex flex-col items-center p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                      <FaRulerCombined className="mr-1" />
                      <span className="font-semibold">{house.width * house.length}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      m<sup>2</sup>
                    </span>
                  </div>
                </div>

                <Link
                  to={house._id}
                  className="block w-full text-center py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-indigo-600 dark:text-indigo-400 rounded-lg font-medium text-sm transition-colors border border-gray-200 dark:border-gray-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
