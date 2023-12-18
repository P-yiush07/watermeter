import { Link } from 'react-router-dom';
import { useAuth } from './appwrite/utils/AuthContext';

const Sidebar = () => {

  

  const { logoutUser } = useAuth()


  return (
    <div className="bg-blue-500 text-white w-64">
      <div className="p-4 flex items-center mt-6 justify-center">
        <span className="ml-2 font-bold text-xl">Water Meter</span>
      </div>
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">
          <Link to="/take-test" className="block">Take Test</Link>
        </li>
        <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">
          <Link to="/my-statistics" className="block">My Statistics</Link>
        </li>
        <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">
          <Link to="/my-profile" className="block">My Profile</Link>
        </li>
      </ul>
      <div className="mt-auto p-4">
        <button
          className="bg-white text-blue-500 font-bold rounded-full py-2 px-4 w-full focus:outline-none hover:bg-blue-100"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
        <span className='p-4 mt-1'>Profile Completed</span>
    </div>
  );
};

export default Sidebar;
