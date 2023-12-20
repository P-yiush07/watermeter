// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import TakeTestComponent from './components/TakeTestComponent';
import MyStatisticsComponent from './components/MyStatisticsComponent';
import MyProfileComponent from './components/MyProfileComponent';
import { AuthProvider } from './components/appwrite/utils/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/appwrite/utils/ProtectedRoute';
// import ProfilePage from './components/ProfilePage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Route for Login */}
            <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
            <Route path="/" element={<Home />} />

              <Route path="/take-test" element={<ProtectedRoute><TakeTestComponent /></ProtectedRoute>} />
              <Route path="/my-statistics" element={<ProtectedRoute><MyStatisticsComponent /></ProtectedRoute>} />
              <Route path="/my-profile" element={<ProtectedRoute><MyProfileComponent /></ProtectedRoute>} />

          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
