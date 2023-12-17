import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './appwrite/utils/AuthContext';

const Login = () => {
    const navigate = useNavigate()
    const {user, loginUser} = useAuth()


    useEffect(() => {
       if(user) {
        navigate('/take-test')
       }
    }, [])
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const userInfo = { email, password }
        loginUser(userInfo)
        
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 mt-[-3rem]">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Login
      </button>
    </form>
    <p className="mt-4">
      Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
    </p>
  </div>
);
};

export default Login;
