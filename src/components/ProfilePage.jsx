// import { useState, useEffect } from 'react';
// import { account } from './appwrite/firebase';

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
//   const [editable, setEditable] = useState(false); // To control input field edit mode

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const loadProfileFromLocalStorage = () => {
//     const storedData = localStorage.getItem('profileData');
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//       setFormData(JSON.parse(storedData));
//       setLoading(false);
//     } else {
//       setLoading(false); // Set loading to false for new users
//     }
//   };

//   useEffect(() => {
//     loadProfileFromLocalStorage();
//   }, []);

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await account.updatePrefs(formData);
//       setProfileData(formData);
//       localStorage.setItem('profileData', JSON.stringify(formData));
//       setEditable(false); // Disable edit mode after saving
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleUpdate = () => {
//     setEditable(true); // Enable edit mode
//   };

//   const handleSetUpdate = () => {
//     setEditable(false); // Disable edit mode
//     setProfileData(formData); // Set the updated profile data
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-8 rounded-md shadow-md w-[44rem]">
//         {/* Your form content */}
//         <form onSubmit={saveProfile}>
//           {/* Populate form fields with profileData */}
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={editable ? formData.name : profileData.name}
//               onChange={handleInputChange}
//               disabled={!editable}
//             />
//           </label>
//           {/* Add similar input fields for other profile details */}
//           {/* ... */}
//           {editable ? (
//             <>
//               <button type="submit">Save</button>
//               <button onClick={handleSetUpdate}>Set Update</button>
//             </>
//           ) : (
//             <button onClick={handleUpdate}>Update</button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MyProfileComponent;
