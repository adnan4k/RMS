import React, { useState } from 'react';
import AddressData from './addressData';
import BankAccount from "./bankAccount"
import HouseForm from './HouseForm';
import Sidebar from '../layout/Sidebar';

function StepperForm() {
    const [step, setStep] = useState(0);

    const [addressData, setAddressData] = useState({});
    const [bankData, setBankData] = useState({});
    const [houseData, setHouseData] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [images, setImages] = useState([]);

    const handleNext = () => {
        setStep(prevStep => prevStep + 1);
    };

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(addressData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        Object.entries(bankData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        Object.entries(houseData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('houseType', selectedOption);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        // Handle the form submission to your backend API
        console.log("Form submitted:", addressData, bankData, houseData, selectedOption, images);
        // axios.post('your-api-endpoint', formData)
        //     .then(response => console.log(response))
        //     .catch(error => console.error(error));
    };

    console.log(houseData);
    return (
        <Sidebar>
            <div className="p-8 flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit}>
                    {step === 0 && <HouseForm houseData={houseData} setHouseData={setHouseData} selectedOption={selectedOption} setSelectedOption={setSelectedOption} images={images} setImages={setImages} />}
                    {step === 1 && <AddressData addressData={addressData} setAddressData={setAddressData} />}
                    {step === 2 && <BankAccount bankData={bankData} setBankData={setBankData} />}

                    <div className="flex justify-between mt-5">
                        {step > 0 && <button type="button" onClick={handlePrevious} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>}
                        {step < 2 && <button type="button" onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>}
                        {step === 2 && <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>}
                    </div>
                </form>
            </div>
        </Sidebar>
    );
}

export default StepperForm;
