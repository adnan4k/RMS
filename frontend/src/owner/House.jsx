import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSingleHouse } from '../api/owner';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  FaBed,
  FaToilet,
  FaArrowsAltH,
  FaMapMarkerAlt,
  FaHome,
  FaDollarSign,
  FaEdit,
  FaFileAlt,
  FaCalendarAlt,
  FaUserAlt,
  FaUniversity,
} from 'react-icons/fa';
import { AvailableDates } from '../components/AvailableDates';
import { MinimalTenant } from '../components/MinimalTenant';
import { Loader } from '../components/Loader';
import { DisplayBankAccount } from '../components/DisplayBankAccount';
import { Link } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

export const SingleHouse = () => {
  const { houseid } = useParams();
  const housePics = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);

  const { data, status } = useQuery({
    queryKey: ['owner-house', houseid],
    queryFn: () => getSingleHouse(houseid),
  });

  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  const [hide, setHide] = useState(true);

  const handleHide = e => {
    if (e.target.id !== 'editdropdown') setHide(true);
  };

  useEffect(() => {
    if (data) {
      setImages(data?.images);
    }
    document.addEventListener('click', handleHide);
    return () => {
      document.removeEventListener('click', handleHide);
    };
  }, [data, status]);

  const swipeImages = (idx, current) => {
    [images[current], images[idx]] = [images[idx], images[current]];
    setImages([...images]);
  };

  if (status === 'pending')
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (status === 'error')
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-64 h-64">
          <MdErrorOutline className="w-full h-full text-red-600 dark:text-red-400" />
          <p className="text-center font-semibold">Page not found!</p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-gray-50 dark:bg-gray-800 mx-auto">
      {/* Page Container */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden">
        {/* Header Bar with Title and Edit Button */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-700 border-b dark:border-gray-600">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <FaHome className="mr-2 text-blue-500" />
            House #{data?.housenumber}
          </h1>

          <div className="relative">
            <button
              onClick={() => setHide(!hide)}
              id="editdropdown"
              className="flex items-center text-gray-100 bg-blue-600 hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
              type="button"
            >
              <FaEdit className="mr-2" />
              <span className="hidden sm:inline">Edit House</span>
              <svg
                className="w-2.5 h-2.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${
                hide ? 'hidden' : ''
              } absolute right-0 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-48 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    to="edit/general"
                    state={data}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaFileAlt className="mr-2 text-blue-500" />
                    General Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="edit/address"
                    state={{ address: data?.address, _id: data?._id }}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    Address
                  </Link>
                </li>
                <li>
                  <Link
                    to="edit/bank"
                    state={{ bankaccounts: data?.bankaccounts, _id: data?._id }}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaUniversity className="mr-2 text-blue-500" />
                    Bank Accounts
                  </Link>
                </li>
                <li>
                  <Link
                    to="edit/images"
                    state={{ images: data?.images, _id: data?._id }}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Images
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 md:p-6">
          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* House Type & Address */}
            <div className="md:col-span-2 bg-white dark:bg-gray-700 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <FaHome className="text-blue-600 dark:text-blue-300 text-lg" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  {data?.house_type.toUpperCase()}
                </h3>
              </div>
              <div className="flex items-start ml-2">
                <FaMapMarkerAlt className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {data?.address.city}, {data?.address.sub_city}, {data?.address.woreda}{' '}
                  {data?.address.kebele && 'kebele, ' + data?.address.kebele}
                </p>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800 p-5 rounded-lg shadow-sm text-white">
              <p className="text-sm text-blue-100 mb-2">Monthly Rent</p>
              <div className="flex items-center justify-center">
                <FaDollarSign className="text-gray-100 text-xl mr-1" />
                <h3 className="text-3xl font-bold text-gray-100">{data?.rent_amount || 0}</h3>
              </div>
            </div>
          </div>

          {/* House Features */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-650 rounded-lg">
                <FaBed className="text-blue-500 text-xl mb-2" />
                <p className="text-center text-sm font-medium">
                  {data?.no_of_rooms}{' '}
                  <span className="text-gray-500 dark:text-gray-400">
                    Bedroom{data?.no_of_rooms !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-650 rounded-lg">
                <FaToilet className="text-blue-500 text-xl mb-2" />
                <p className="text-center text-sm font-medium">
                  {data?.no_of_bath_rooms}{' '}
                  <span className="text-gray-500 dark:text-gray-400">
                    Bathroom{data?.no_of_bath_rooms !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-650 rounded-lg">
                <FaArrowsAltH className="text-blue-500 text-xl mb-2" />
                <p className="text-center text-sm font-medium">
                  {data?.width * data?.length}{' '}
                  <span className="text-gray-500 dark:text-gray-400">
                    m<sup>2</sup>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
            {images.length > 1 ? (
              <Carousel
                showArrows={true}
                onChange={setCurrent}
                selectedItem={current}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                className="min-w-full"
                renderArrowPrev={(clickHandler, hasPrev) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={clickHandler}
                      className="absolute left-0 z-10 bg-black bg-opacity-50 p-2 rounded-r-md top-1/2 transform -translate-y-1/2"
                      aria-label="Previous slide"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  )
                }
                renderArrowNext={(clickHandler, hasNext) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={clickHandler}
                      className="absolute right-0 z-10 bg-black bg-opacity-50 p-2 rounded-l-md top-1/2 transform -translate-y-1/2"
                      aria-label="Next slide"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )
                }
              >
                {images.map((image, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={'http://localhost:4001/' + image}
                      className="h-[350px] md:h-[450px] w-full object-cover dark:bg-gray-600"
                      alt={`House view ${idx + 1}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16 opacity-60"></div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div>
                {images.map((image, idx) => (
                  <img
                    key={idx}
                    src={'http://localhost:4001/' + image}
                    className="h-[350px] md:h-[450px] w-full object-cover dark:bg-gray-600"
                    alt={`House view ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex mb-6 overflow-x-auto px-2 py-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex gap-3 items-center mx-auto" ref={housePics}>
              {images.map((image, idx) => (
                <img
                  key={idx}
                  src={'http://localhost:4001/' + image}
                  onClick={() => swipeImages(idx, current)}
                  className={`h-16 w-16 md:h-20 md:w-20 object-cover rounded-md cursor-pointer transition-all duration-200 ${
                    current === idx
                      ? 'ring-2 ring-blue-500 shadow-md scale-105'
                      : 'opacity-80 hover:opacity-100 hover:ring-1 hover:ring-blue-400'
                  }`}
                  alt={`Thumbnail ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Tab Section */}
          <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600">
            {/* Tab Navigation */}
            <div className="flex border-b dark:border-gray-600">
              <button
                onClick={() => setTabIndex(0)}
                className={`flex items-center justify-center py-3 px-4 text-center transition-all font-medium flex-1 ${
                  tabIndex === 0
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650'
                }`}
              >
                <FaFileAlt
                  className={`mr-2 ${tabIndex === 0 ? 'text-blue-500' : 'text-gray-400'}`}
                />
                Description
              </button>
              <button
                onClick={() => setTabIndex(1)}
                className={`flex items-center justify-center py-3 px-4 text-center transition-all font-medium flex-1 ${
                  tabIndex === 1
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650'
                }`}
              >
                <FaCalendarAlt
                  className={`mr-2 ${tabIndex === 1 ? 'text-blue-500' : 'text-gray-400'}`}
                />
                Calendar
              </button>
              <button
                onClick={() => setTabIndex(2)}
                className={`flex items-center justify-center py-3 px-4 text-center transition-all font-medium flex-1 ${
                  tabIndex === 2
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650'
                }`}
              >
                <FaUserAlt
                  className={`mr-2 ${tabIndex === 2 ? 'text-blue-500' : 'text-gray-400'}`}
                />
                Tenant
              </button>
              <button
                onClick={() => setTabIndex(3)}
                className={`flex items-center justify-center py-3 px-4 text-center transition-all font-medium flex-1 ${
                  tabIndex === 3
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650'
                }`}
              >
                <FaUniversity
                  className={`mr-2 ${tabIndex === 3 ? 'text-blue-500' : 'text-gray-400'}`}
                />
                Bank Accounts
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-5 min-h-[250px]">
              {tabIndex === 0 && (
                <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700 dark:text-gray-200">
                  {data?.description.split('\n').map((d, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {tabIndex === 1 && <AvailableDates dates={data?.calendar} houseid={data?._id} />}
              {tabIndex === 2 && <MinimalTenant houseId={data?._id} tenant={data?.tenant} />}
              {tabIndex === 3 && <DisplayBankAccount bankaccounts={data?.bankaccounts} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
