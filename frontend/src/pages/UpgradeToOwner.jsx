import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createowner } from '../api/owner';
import { FaIdCard, FaCity, FaMapMarkedAlt, FaBuilding, FaHouseUser } from 'react-icons/fa';

// Validation to be done
const UpgradeToOwner = () => {
  const [address, setAddress] = useState({
    city: '',
    sub_city: '',
    kebele: '',
    woreda: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const form = useRef(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createowner,
    onSuccess: owner => {
      const user = queryClient.getQueryData(['user']);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.setQueryData(['name'], { ...user, owner: owner.savedOwner });
      toast.success('Successfully registered as owner');
      navigate('/profile');
    },
    onError: error => {
      const user = queryClient.getQueryData(['user']);
      toast.error(error.response.data.message);
    },
  });

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!image) {
      setError('Please choose a file');
      return;
    }

    const newForm = new FormData();
    newForm.append('nationalid', image);
    newForm.append('address', JSON.stringify(address));

    mutate(newForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center">
            <FaHouseUser className="mr-3 text-4xl" />
            Become a Property Owner
          </h1>
          <p className="text-center mt-2 text-blue-100">
            Join our platform as a property owner and start listing your properties
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} ref={form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <FaCity className="text-blue-500 mr-2" />
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      City
                    </label>
                  </div>
                  <input
                    onChange={handleAddressChange}
                    type="text"
                    name="city"
                    id="city"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="flex items-center mb-2">
                    <FaMapMarkedAlt className="text-blue-500 mr-2" />
                    <label
                      htmlFor="sub_city"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Sub City
                    </label>
                  </div>
                  <input
                    onChange={handleAddressChange}
                    type="text"
                    name="sub_city"
                    id="sub_city"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <FaBuilding className="text-blue-500 mr-2" />
                    <label
                      htmlFor="woreda"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Woreda
                    </label>
                  </div>
                  <input
                    onChange={handleAddressChange}
                    type="text"
                    name="woreda"
                    id="woreda"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="flex items-center mb-2">
                    <FaMapMarkedAlt className="text-blue-500 mr-2" />
                    <label
                      htmlFor="kebele"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Kebele
                    </label>
                  </div>
                  <input
                    onChange={handleAddressChange}
                    type="text"
                    name="kebele"
                    id="kebele"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-6">
              <div className="flex items-center mb-2">
                <FaIdCard className="text-blue-500 mr-2" />
                <label
                  htmlFor="file_input"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Upload National ID
                </label>
              </div>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  onChange={e => setImage(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-describedby="file_input_help"
                  name="images"
                  type="file"
                  required
                />
                <div className="space-y-2">
                  <div className="mx-auto w-12 h-12 text-gray-400">
                    <FaIdCard className="w-full h-full" />
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    JPEG, WEBP, PNG, JPG (MAX. 3 MB)
                  </p>
                  {image && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Selected: {image.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-1/2 flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Register as Owner'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToOwner;
