import { useEffect, useState } from 'react';
import { databases } from './appwrite/appwriteconfig';
import { ID } from "appwrite";

const MyProfileComponent = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [profileStatus, setProfileStatus] = useState(false)
  const [retrievedData, setRetrievedData] = useState(null);
  const [documentId, setDocumentId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      name: name,
      age: age,
      gender: selectedGender,
      height: height,
      weight: weight,
      profilecomplete: true,
    };

    try {
      const response = await databases.createDocument(
        '657ee0306afa5a50bd2a',
        '657ee04b620145823fe1',
        ID.unique(),
        data
      );

      setDocumentId(response.$id);

      // Update profileStatus state to true

      setProfileStatus(true);

      console.log('Document created:', response);
    } catch (error) {
      console.error('Error creating document:', error);
    }

    e.target.reset();
  };

  // console.log('Profile status after setting to true:', profileStatus);

  const fetchDocumentData = async () => {
    try {
      const response = await databases.getDocument('657ee0306afa5a50bd2a', '657ee04b620145823fe1', documentId);
      setRetrievedData(response); // Set the retrieved data to state
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  useEffect(() => {
    if (profileStatus && documentId) {
      fetchDocumentData(); // Fetch data using the stored document ID
      console.log(documentId);
    }
  }, [profileStatus, documentId]);

  // if (retrievedData) {
  //   console.log('Retrieved data:', retrievedData.name); // Log retrieved data when it's available
  // }

  return (
    <div className="flex justify-center items-center h-screen">
      {profileStatus ? (
        // Show the profile name div when profileStatus is true
        <div className="bg-white p-8 rounded-md shadow-md w-[44rem]">
          <h2 className="text-2xl font-semibold mb-5">Profile Name: {name}</h2>
          {/* Other profile details here if needed */}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-md shadow-md w-[44rem]">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 flex items-center">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800 ml-2"
              />
            </div>
            <div className="mb-5 flex items-center">
              <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={age}
                onChange={handleAgeChange}
                placeholder="Enter your age"
                className="border border-gray-300 rounded-md w-16 py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800 ml-2"
              />
              <div className="-mb-2 ml-8 mt-5 flex items-center">
                <label htmlFor="gender" className="block w-9 text-gray-700 font-semibold mb-7 whitespace-nowrap">
                  Select Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={selectedGender}
                  onChange={handleGenderChange}
                  className="-mt-7 block w-full border border-gray-300 rounded-md py-2 px-3 ml-20 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

            </div>

            <div className='-mt-2'>
              <div className="mb-5">
                <label htmlFor="height" className="block text-gray-700 font-semibold mb-2">
                  Height (cm)
                </label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={height}
                  onChange={handleHeightChange}
                  placeholder="Enter your height"
                  className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="weight" className="block text-gray-700 font-semibold mb-2">
                  Weight (kg)
                </label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={handleWeightChange}
                  placeholder="Enter your weight"
                  className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default MyProfileComponent;