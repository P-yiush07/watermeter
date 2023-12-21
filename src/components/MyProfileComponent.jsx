import { useState, useEffect } from 'react';
import { useAuth } from './appwrite/utils/AuthContext';
import { doc, serverTimestamp, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from './appwrite/firebase';

const MyProfileComponent = () => {
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        profileCompleted: true,
        timeStamp: serverTimestamp()
      })
      setIsSubmitted(true);

       // Update local data state after submission
    const updatedData = { id: user.uid, ...formData };
    setData([updatedData]);
    } catch (error) {
      console.log("Error in setting Document", error.message);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        });
        setData(list)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

  console.log(data);
  return (
    <>
      <div>
        <p>Welcome {user.uid}</p>
        {data.length > 0 ? (
          <>
          <p>Welcome {data[0].name}</p>
          <p>Welcome {data[0].id}</p>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      {isSubmitted ? (
        <p>Successfuly Submitted</p>
      ) : (
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
      )}
    </>
  )
}

export default MyProfileComponent;


// import { useEffect, useState } from 'react';

// const MyProfileComponent = () => {

//   const [profileData, setProfileData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     height: '',
//     weight: '',
//   });

//   const [isEditing, setIsEditing] = useState({
//     name: false,
//     age: false,
//     gender: false,
//     height: false,
//     weight: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const storedData = localStorage.getItem('profileData');
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//       setLoading(false);
//     } else {
//       setLoading(false); // Set loading to false for new users
//     }
//   }, []);


//   const saveProfile = async (e, field) => {
//     e.preventDefault();
//     try {
//       await account.updatePrefs({ [field]: formData[field] });
//       setProfileData({ ...profileData, [field]: formData[field] });
//       localStorage.setItem('profileData', JSON.stringify({ ...profileData, [field]: formData[field] }));
//       setIsEditing({ ...isEditing, [field]: false });
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleEditClick = (field) => {
//     setIsEditing({ ...isEditing, [field]: true });
//     setFormData({ ...formData, [field]: profileData[field] });
//   };


//   if (loading) {
//     return <p>Loading...</p>;
//   }

//    if (!Object.keys(profileData).length) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="bg-white p-8 rounded-md shadow-md w-[44rem]">
//           <form onSubmit={saveProfile}>
//             <div className="mb-5 flex items-center">
//               <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your name"
//                 className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800 ml-2"
//               />
//             </div>
//             <div className="mb-5 flex items-center">
//               <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">
//                 Age
//               </label>
//               <input
//                 type="text"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 placeholder="Enter your age"
//                 className="border border-gray-300 rounded-md w-16 py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800 ml-2"
//               />
//               <div className="-mb-2 ml-8 mt-5 flex items-center">
//                 <label htmlFor="gender" className="block w-9 text-gray-700 font-semibold mb-7 whitespace-nowrap">
//                   Select Gender
//                 </label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   className="-mt-7 block w-full border border-gray-300 rounded-md py-2 px-3 ml-20 focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>

//             </div>

//             <div className='-mt-2'>
//               <div className="mb-5">
//                 <label htmlFor="height" className="block text-gray-700 font-semibold mb-2">
//                   Height (cm)
//                 </label>
//                 <input
//                   type="text"
//                   id="height"
//                   name="height"
//                   value={formData.height}
//                   onChange={handleInputChange}
//                   placeholder="Enter your height"
//                   className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800"
//                 />
//               </div>
//               <div className="mb-5">
//                 <label htmlFor="weight" className="block text-gray-700 font-semibold mb-2">
//                   Weight (kg)
//                 </label>
//                 <input
//                   type="text"
//                   id="weight"
//                   name="weight"
//                   value={formData.weight}
//                   onChange={handleInputChange}
//                   placeholder="Enter your weight"
//                   className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//    }

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-8 rounded-md shadow-md w-[44rem]">
//         {Object.keys(profileData).map((field) => (
//           <div key={field}>
//             {isEditing[field] ? (
//               <form onSubmit={(e) => saveProfile(e, field)}>
//                 <div className="mb-5 flex items-center">
//                   <label htmlFor={field} className="block text-gray-700 font-semibold mb-2">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     type="text"
//                     id={field}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleInputChange}
//                     placeholder={`Enter your ${field}`}
//                     className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800 ml-2"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Save
//                 </button>
//               </form>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-semibold mb-5">
//                   {field.charAt(0).toUpperCase() + field.slice(1)}: {profileData[field]}
//                 </h2>
//                 <button
//                   onClick={() => handleEditClick(field)}
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Update {field.charAt(0).toUpperCase() + field.slice(1)}
//                 </button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyProfileComponent