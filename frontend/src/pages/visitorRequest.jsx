import React, { useState } from 'react';
import BasicDateCalendar from '../components/Calander';
import axios from 'axios';
import { toast } from 'react-toastify';

function VisitorRequest() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [message, setMessage] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = {
            date: selectedDate,
            message,
        };

        // Send the form data to the backend
        try {
            const response = await axios.post('/submit', formData);

            if (response.status === 200) {
                // Handle successful response
                toast.success('Form submitted successfully');
            } else {
                // Handle error response
                toast.error('Form submission failed');
            }
        } catch (error) {
            toast.error('Error submitting form');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-1/2 flex flex-col items-center">
                <div className="mb-8">
                    <BasicDateCalendar onDateChange={handleDateChange} />
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={message}
                        onChange={handleMessageChange}
                    ></textarea>
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
            </form>
        </div>
    );
}

export default VisitorRequest;
