import React, { useState } from 'react';
import AddressData from './addressData';
import HouseForm from './HouseForm';
import Sidebar from '../layout/Sidebar';
import { AddBankAccounts } from '../components/AddBankAccounts';
import { HouseProgress } from '../components/HouseProgress';
import { validateForm } from '../utils/validation';
import {useMutation} from '@tanstack/react-query';
import { createHouse } from '../api/house';
import { useOutletContext } from 'react-router-dom';

function StepperForm() {
    const [step, setStep] = useState(0);

    const [addressData, setAddressData] = useState({});
    const [houseData, setHouseData] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [images, setImages] = useState([]);

    const [CBE, setCBE] = useState(['']);
    const [BOA, setBOA] = useState(['']);
    const [awash, setAwash] = useState(['']);
    const [hijra, setHijra] = useState(['']);

    const owner = useOutletContext();
    const {mutate, status} = useMutation({
        mutationFn: createHouse,
        onSuccess: (house) => {
            console.log(house)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    const handleNext = () => {
        setStep(prevStep => prevStep + 1);
    };

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!images || images.length === 0) {
            console.log('error')
            return
        }

        const formData = new FormData();
        formData.append('address', JSON.stringify(addressData))
        
        let bankData = []
        CBE.forEach((accountno) => {
            if (accountno.trim() === '')
                return
            bankData.push({bankname:'CBE', accountnumber:accountno.trim()})
        })
        BOA.forEach((accountno) => {
            if (accountno.trim() === '')
                return
            bankData.push({bankname:'BOA', accountnumber:accountno.trim()})
        })
        awash.forEach((accountno) => {
            if (accountno.trim() === '')
                return
            bankData.push({bankname:'Awash', accountnumber:accountno.trim()})
        })
        hijra.forEach((accountno) => {
            if (accountno.trim() === '')
                return
            bankData.push({bankname:'Hijra', accountnumber:accountno.trim()})
        })
        formData.append('bankaccounts', JSON.stringify(bankData))
        
        Object.entries(houseData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('house_type', selectedOption);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
          
        mutate(formData);
    };

    const houseValidation = validateForm(houseData, ['width', 'height', 'rentamount'])
 
    return (<div className="p-8 flex flex-col justify-around items-center h-full">
                <HouseProgress idx={step}/>
                 <div>
                    {step === 0 && <HouseForm houseData={houseData} setHouseData={setHouseData} selectedOption={selectedOption} setSelectedOption={setSelectedOption} showDropDown={showDropDown} setShowDropDown={setShowDropDown} setImages={setImages} />}
                    {step === 1 && <AddressData addressData={addressData} setAddressData={setAddressData} />}
                    {step === 2 && <AddBankAccounts CBE={CBE} setCBE={setCBE} BOA={BOA} setBOA={setBOA} awash={awash} setAwash={setAwash} hijra={hijra} setHijra={setHijra}/>}
                    <div className="flex justify-end my-4 gap-8">
                        {step > 0 && <button type="button" onClick={handlePrevious} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>}
                        {step < 2 && <button type="button" onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>}
                        {step === 2 && <button type="submit" onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>}
                    </div>
                </div>
            </div>
    );
}

export default StepperForm;
