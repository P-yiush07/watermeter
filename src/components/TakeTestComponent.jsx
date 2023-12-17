import { useState } from 'react';

const TakeTestComponent = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dailyWaterIntakeMin, setDailyWaterIntakeMin] = useState('');
  const [dailyWaterIntakeMax, setDailyWaterIntakeMax] = useState('');

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const getSalutation = () => {
    const parsedAge = parseInt(age);
    if (selectedGender === 'female' && parsedAge <= 18) {
      return 'Miss';
    } else if (selectedGender === 'male' && parsedAge <= 18) {
      return 'Master';
    } else if (selectedGender === 'female') {
      return 'Ms/Mrs';
    } else {
      return 'Mr';
    }
  };

  const calculateWaterIntake = () => {
    const weightInKg = parseFloat(weight);
    const minIntake = weightInKg * 0.03;
    const maxIntake = weightInKg * 0.04;
    setDailyWaterIntakeMin(minIntake.toFixed(1));
    setDailyWaterIntakeMax(maxIntake.toFixed(1));
  };

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Take Test Component</h2>
      <div className="flex items-start">
        <div className="w-48">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Select Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={selectedGender}
            onChange={handleGenderChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {selectedGender && (
          <div className="ml-4 flex-1">
            <div className="flex">
              <div className="mr-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Enter Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={handleAgeChange}
                  className="mt-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-20"
                />
              </div>
              {age && (
                <div className="flex items-center">
                  <div className="mr-4 mt-6 text-sm font-medium text-gray-700 flex items-center">
                    {selectedGender === 'female' && parseInt(age) <= 18 ? 'Miss' : getSalutation()}
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Enter Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="mt-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-48"
                    />
                  </div>
                  {name && (
                    <div className="ml-4">
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                        Enter Height (cm)
                      </label>
                      <input
                        id="height"
                        type="text"
                        value={height}
                        onChange={handleHeightChange}
                        className="mt-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-28"
                      />
                    </div>
                  )}
                  {height && (
                    <div className="ml-4">
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                        Enter Weight (kg)
                      </label>
                      <input
                        id="weight"
                        type="text"
                        value={weight}
                        onChange={handleWeightChange}
                        className="mt-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-28"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {weight && (
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={calculateWaterIntake}
          >
            Calculate
          </button>
        </div>
      )}
    {dailyWaterIntakeMin && dailyWaterIntakeMax && (
        <div className="mt-4">
          <p>
            Hey, {getSalutation()} {name}, you should drink {dailyWaterIntakeMin} to {dailyWaterIntakeMax} liters of water per day.
          </p>
        </div>
      )}
    </div>
  );
};

export default TakeTestComponent;
