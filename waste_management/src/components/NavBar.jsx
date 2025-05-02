import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils/constants";
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async() => {
    try {
      await axios.post(
        BASE_URL + "/auth/user/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    }
    catch(err) {
      // Error handling could be improved here
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="ml-2 text-white font-bold text-lg">Waste Management System</span>
            </Link>
          </div>

          {/* User Section */}
          {user && (
            <div className="flex items-center">
              {/* Welcome Message */}
              <span className="hidden md:block text-white font-medium mr-4">
                Welcome, {user.firstName}
              </span>

              {/* User Dropdown */}
              <div className="relative group">
                <button className="flex items-center focus:outline-none">
                  <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={user.photoUrl || "/api/placeholder/40/40"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <svg className="ml-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-200 ease-in-out">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{user.firstName} {user.lastName}</p>
                    </div>
                    
                    <Link to="/profile" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm text-gray-700">Profile</span>
                      <span className="ml-auto bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">New</span>
                    </Link>
                    
                    <Link to="/videos" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-700">DIY Videos</span>
                    </Link>
                    
                    <Link to="/connections" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">Connections</span>
                    </Link>
                    
                    <Link to="/requests" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                      </svg>
                      <span className="text-sm text-gray-700">Requests</span>
                    </Link>
                    
                    <button 
                      onClick={handleLogOut} 
                      className="w-full flex items-center px-4 py-3 text-left hover:bg-red-50 transition-colors"
                    >
                      <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-sm text-red-700">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;