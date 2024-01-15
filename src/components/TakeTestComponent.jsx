import { useState } from 'react';
import { useAuth } from './appwrite/utils/AuthContext';
import axios from 'axios';

const TakeTestComponent = () => {

  const [prediction, setPrediction] = useState(null);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');


  const handleSubmit = async() => {
    try {
      const activityLevels = {
        'Activity Level_moderate': selectedActivity === 'Moderate' ? 1 : 0,
        'Activity Level_sedentary': selectedActivity === 'Sedentary' ? 1 : 0,
        'Activity Level_active': selectedActivity === 'Active' ? 1 : 0,
      };

      const response = await axios.post('http://127.0.0.1:5000/predict', {
       Age: parseInt(age),
        Weight: parseInt(weight),
        ...activityLevels,
      });

      setPrediction(response.data.predicted_water_intake);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const predictionInLiters = prediction ? (prediction / 1000).toFixed(2) : null;

 

  const { user } = useAuth()

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Take Test Component : {user.email}</h2>
      <div>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="age" className="mb-1">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="weight" className="mb-1">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter Weight"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
        <label htmlFor="activityLevel" className="mb-1">Activity Level:</label>
          <select
            id="activityLevel"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Activity Level</option>
            <option value="Moderate">Moderate</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Active">Active</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Get Prediction</button>
        {predictionInLiters && <p>Predicted Water Intake: {predictionInLiters} Litres</p>}
      </div>
      </div>
    </div>
  );
};

export default TakeTestComponent;
