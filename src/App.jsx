// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import TakeTestComponent from './components/TakeTestComponent';
import MyStatisticsComponent from './components/MyStatisticsComponent';
import MyProfileComponent from './components/MyProfileComponent';
import PrivateRoutes from './components/appwrite/utils/PrivateRoutes';
import { AuthProvider } from './components/appwrite/utils/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Route for Login */}
            <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
            <Route path="/" element={<Home />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/take-test" element={<TakeTestComponent />} />
              <Route path="/my-statistics" element={<MyStatisticsComponent />} />
              <Route path="/my-profile" element={<MyProfileComponent />} />
            </Route>

          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
