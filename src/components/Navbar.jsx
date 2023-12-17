import { Link } from 'react-router-dom';

const Navbar = () => {
  const navLinkStyle = {
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    color: 'white',
    display: 'inline-block',
  };

  return (
    <nav className="bg-blue-500 text-white py-4 flex justify-between items-center">
      <div className="ml-4">
        <span className="font-bold text-xl">Water Meter</span>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            style={navLinkStyle}
            className="nav-link font-semibold"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'blue';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = 'center';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '';
              e.target.style.color = 'white';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = '';
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/"
            style={navLinkStyle}
            className="nav-link font-semibold"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'blue';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = 'center';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '';
              e.target.style.color = 'white';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = '';
            }}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/"
            style={navLinkStyle}
            className="nav-link font-semibold"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'blue';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = 'center';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '';
              e.target.style.color = 'white';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = '';
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/"
            style={navLinkStyle}
            className="nav-link font-semibold"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'blue';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = 'center';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '';
              e.target.style.color = 'white';
              e.target.style.borderRadius = '0.8rem';
              e.target.style.padding = '0.5rem 1rem';
              e.target.style.textAlign = '';
            }}
          >
            Contact
          </Link>
        </li>
        {/* Other list items follow the same pattern */}
        {/* ... */}
      </ul>
      <div className="mr-6">
        <Link to="/login" className="bg-white font-bold text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 transition-colors duration-300 flex items-center">
          <span className="mx-auto">Login</span>
        </Link></div>
    </nav>
  );
};

export default Navbar;
