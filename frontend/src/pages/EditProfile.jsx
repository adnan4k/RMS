import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { editprofile, getUser } from '../api/auth';
import { validateForm } from '../utils/validation';
import { toast } from 'react-toastify';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUserEdit, FaUserCircle } from 'react-icons/fa';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phonenumber: '',
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: editprofile,
    onSuccess: user => {
      queryClient.setQueryData(['user'], user);
      toast.success('Successfully updated');
      navigate('/profile');
    },
    onError: error => {
      toast.error(error.response.data.message);
    },
  });

  const data = useOutletContext();
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (Object.keys(errors).length === 0)
      mutate({ ...formData, phonenumber: '+251' + formData.phonenumber, user: data.username });
    else {
      Object.keys(errors).forEach(key => {
        toast.error(`${key}: ${errors[key]}`);
      });
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({ ...data, phonenumber: data.phonenumber.slice(4) });
    }
  }, [data]);

  const errors = validateForm(formData, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center">
            <FaUserEdit className="mr-3 text-4xl" />
            Edit Your Profile
          </h1>
          <p className="text-center mt-2 text-blue-100">Update your personal information</p>
        </div>

        <div className="p-8">
          {data && (
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <FaUserCircle className="w-20 h-20 text-blue-500 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {data.firstname} {data.lastname}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{data.email}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="flex items-center mb-2">
                  <FaUser className="text-blue-500 mr-2" />
                  <label
                    htmlFor="firstname"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    First Name
                  </label>
                </div>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
                {errors.firstname !== '' && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.firstname}</p>
                )}
              </div>

              <div className="relative">
                <div className="flex items-center mb-2">
                  <FaUser className="text-blue-500 mr-2" />
                  <label
                    htmlFor="lastname"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Last Name
                  </label>
                </div>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
                {errors.lastname !== '' && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.lastname}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-blue-500 mr-2" />
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              {errors.email !== '' && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <div className="flex items-center mb-2">
                <FaPhone className="text-blue-500 mr-2" />
                <label
                  htmlFor="phonenumber"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
              </div>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  +251
                </span>
                <input
                  type="tel"
                  pattern="[0-9]{9}"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  name="phonenumber"
                  id="phonenumber"
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-e-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="935556072"
                  required
                />
              </div>
              {errors.phonenumber !== '' && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.phonenumber}</p>
              )}
            </div>

            <div className="relative">
              <div className="flex items-center mb-2">
                <FaUserEdit className="text-blue-500 mr-2" />
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
              </div>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              {errors.username !== '' && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.username}</p>
              )}
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
                    Updating Profile...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
