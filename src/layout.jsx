import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  const location = useLocation();

  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
  const showNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Render Navbar on Login, Signup, and Home pages */}
      {showNavbar && <Navbar />}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conditionally render the Sidebar */}
        {!hideSidebar && location.pathname !== '/' && <Sidebar />} {/* Ensure Sidebar doesn't appear on Home */}

        {/* Display main content */}
        <div className={`${location.pathname === '/' ? 'w-full' : 'flex-1'} p-1`}>
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
