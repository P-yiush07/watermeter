import React, { useState } from 'react'
import { useCrud } from './appwrite/utils/CdContext';

const ReminderComponent = () => {
    
    const { setIntake } = useCrud(); // CRUD CONTEXT

    const [dailyIntake, setDailyIntake] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const handleInputChange = (event) => {
        setDailyIntake(event.target.value);
    };

    const handleGoBack = () => {
        setShowDialog(false);
        setDailyIntake(''); // Reset the input value
      };

    const setData = () => {
        setShowDialog(true);
        setIntake(dailyIntake);
        console.log('Entered String =>', dailyIntake);
    }


    return (
        <>
            <div className="py-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Reminder Component</h2>
                <div className="mt-4">
                    <label className="block text-gray-700" htmlFor="dailyIntake">
                        Enter your daily intake:
                    </label>
                    <input
                        id="dailyIntake"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        type="text"
                        placeholder="Enter your daily intake"
                        value={dailyIntake}
                        onChange={handleInputChange}
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                        onClick={setData}
                    >
                        Set Data
                    </button>
                </div>
                {showDialog && (
                    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <p className="mb-4">Successfully submitted!</p>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 focus:outline-none hover:bg-blue-600"
                                onClick={handleGoBack}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ReminderComponent
