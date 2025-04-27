import React, { useState } from 'react';
import AddressData from './addressData';
import HouseForm from './HouseForm';
import { AddBankAccounts } from '../components/AddBankAccounts';
import { HouseProgress } from '../components/HouseProgress';
import { validateForm } from '../utils/validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHouse } from '../api/house';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight, FaSave, FaHome } from 'react-icons/fa';

function StepperForm() {
  const [step, setStep] = useState(0);

  const [addressData, setAddressData] = useState({
    city: '',
    sub_city: '',
    kebele: '',
    woreda: '',
    longitude: '',
    latitude: '',
  });
  const [displayError, setDisplayError] = useState(new Set());
  const [houseData, setHouseData] = useState({
    no_of_rooms: '',
    no_of_bath_rooms: '',
    length: '',
    width: '',
    housenumber: '',
    description: '',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [images, setImages] = useState([]);

  const [CBE, setCBE] = useState(['']);
  const [BOA, setBOA] = useState(['']);
  const [awash, setAwash] = useState(['']);
  const [hijra, setHijra] = useState(['']);

  const owner = useOutletContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: createHouse,
    onSuccess: house => {
      queryClient.invalidateQueries({ queryKey: ['owner-houses'], exact: true });
      queryClient.setQueryData(['owner-houses', house._id], house);
      navigate('/owner/' + house._id);
      toast.success('House created successfully');
    },
    onError: err => {
      toast.error(err.response ? err.response.data.message : err.message);
      console.log(err);
    },
  });
  const handleNext = () => {
    if (Object.keys(houseErrors).length > 0) {
      Object.keys(houseErrors).forEach(key => setDisplayError(prev => new Set(prev.add(key))));
      const field = Object.keys(houseErrors)[0];

      return toast.error(`${field}: ${houseErrors[field]}`);
    }
    if (images.length < 1) {
      setDisplayError(new Set(displayError.add('images')));
      return toast.error(`At least one house image is required`);
    }
    if (step > 0 && Object.keys(addressErrors).length > 0) {
      Object.keys(addressErrors).forEach(key => setDisplayError(prev => new Set(prev.add(key))));
      const field = Object.keys(addressErrors)[0];

      return toast.error(`${field}: ${addressErrors[field]}`);
    }
    setStep(prevStep => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!images || images.length === 0) {
      toast.error("You haven't chosen an image");
      return;
    }

    const formData = new FormData();
    formData.append('address', JSON.stringify(addressData));

    let bankData = [];
    CBE.forEach(accountno => {
      if (accountno.trim() === '') return;
      bankData.push({ bankname: 'CBE', accountnumber: accountno.trim() });
    });
    BOA.forEach(accountno => {
      if (accountno.trim() === '') return;
      bankData.push({ bankname: 'BOA', accountnumber: accountno.trim() });
    });
    awash.forEach(accountno => {
      if (accountno.trim() === '') return;
      bankData.push({ bankname: 'Awash', accountnumber: accountno.trim() });
    });
    hijra.forEach(accountno => {
      if (accountno.trim() === '') return;
      bankData.push({ bankname: 'Hijra', accountnumber: accountno.trim() });
    });
    formData.append('bankaccounts', JSON.stringify(bankData));

    Object.entries(houseData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('house_type', selectedOption);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    mutate(formData);
  };

  const houseErrors = validateForm(houseData, ['description']);
  const addressErrors = validateForm(addressData, ['longitude', 'latitude', 'woreda', 'kebele']);

  const stepTitles = ['House Details', 'Location Information', 'Bank Accounts'];

  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto bg-gray-50 dark:bg-gray-700 rounded-md">
      {/* Header */}
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <FaHome className="text-indigo-600 dark:text-indigo-400 text-xl mr-3" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Add New Property</h1>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <HouseProgress idx={step} />
        <h2 className="text-xl font-semibold text-center mt-4 text-gray-800 dark:text-gray-200">
          {stepTitles[step]}
        </h2>
      </div>

      {/* Form container */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
        {step === 0 && (
          <HouseForm
            houseData={houseData}
            setHouseData={setHouseData}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            images={images}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
            setImages={setImages}
            errors={houseErrors}
            setDisplay={setDisplayError}
            displayError={displayError}
          />
        )}
        {step === 1 && (
          <AddressData
            addressData={addressData}
            setAddressData={setAddressData}
            errors={addressErrors}
            setDisplay={setDisplayError}
            displayError={displayError}
          />
        )}
        {step === 2 && (
          <AddBankAccounts
            CBE={CBE}
            setCBE={setCBE}
            BOA={BOA}
            setBOA={setBOA}
            awash={awash}
            setAwash={setAwash}
            hijra={hijra}
            setHijra={setHijra}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end gap-4 mt-6">
        {step > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="flex items-center px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium rounded-lg transition-colors"
            disabled={status === 'pending'}
          >
            <FaArrowLeft className="mr-2" /> Previous
          </button>
        )}
        {step < 2 && (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-gray-100 dark:text-gray-100 font-medium rounded-lg transition-colors"
            disabled={status === 'pending'}
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        )}
        {step === 2 && (
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-gray-100 dark:text-gray-100 font-medium rounded-lg transition-colors"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? (
              'Saving...'
            ) : (
              <>
                <FaSave className="mr-2" /> Save Property
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default StepperForm;
