import { useEffect, useState } from 'react';
import { account } from './appwrite/appwriteconfig';


const MyProfileComponent = () => {

  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
  });


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
      setProfileData(JSON.parse(storedData));
      setLoading(false);
    } else {
      setLoading(false); // Set loading to false for new users
    }
  }, []);


  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      await account.updatePrefs(formData);
      setProfileData(formData);
      localStorage.setItem('profileData', JSON.stringify(formData));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

   if (!Object.keys(profileData).length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-md w-[44rem]">
          <form onSubmit={saveProfile}>
            <div className="mb-5 flex items-center">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.age}
                onChange={handleInputChange}
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
                  value={formData.gender}
                  onChange={handleInputChange}
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
                  value={formData.height}
                  onChange={handleInputChange}
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
                  value={formData.weight}
                  onChange={handleInputChange}
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
      </div>
    )
   }

  return (
    <div className="flex justify-center items-center h-screen">
       <div className="bg-white p-8 rounded-md shadow-md w-[44rem]">
          <h2 className="text-2xl font-semibold mb-5">Profile Name: {profileData.name}</h2>
          {/* Other profile details here if needed */}
        </div>
    </div>
  );
};
export default MyProfileComponent;