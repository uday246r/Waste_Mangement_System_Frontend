import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../utils/constants";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from "../utils/feedSlice";
import UserCard from './UserCard';
import CompanyCard from './CompanyCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log("Feed data not received");
      setError("Failed to load feed data");
    } finally {
      // Reduced timeout for better UX
      setTimeout(() => setLoading(false), 1500);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (!loading && feed.length === 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feed]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-teal-700 font-medium">Loading your personalized feed...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500 max-w-md">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => {
              setError(null);
              getFeed();
            }}
            className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!feed) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-amber-500 max-w-md">
          <h1 className="text-xl font-semibold text-amber-600">No Companies Found</h1>
          <p className="mt-2 text-gray-600">There are currently no companies in the system.</p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={getFeed}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-300 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter to only show company cards
  const companyFeed = feed.filter(item => item?.companyName);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-teal-800 mb-4 sm:mb-0">
            Companies
          </h2>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg shadow-sm flex p-1">
              <button
                onClick={() => setView('grid')}
                className={`px-3 py-1.5 rounded ${
                  view === 'grid' 
                    ? 'bg-teal-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1.5 rounded ${
                  view === 'list' 
                    ? 'bg-teal-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={getFeed}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-300 flex items-center"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mb-8"></div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {companyFeed.map((item, index) => (
              <div key={item._id || index} className="transform transition-all duration-300 hover:translate-y-1">
                <CompanyCard company={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {companyFeed.map((item, index) => (
              <div key={item._id || index} className="transform transition-all duration-300 hover:translate-y-1 max-w-4xl mx-auto">
                <CompanyCard company={item} />
              </div>
            ))}
          </div>
        )}
        
        {companyFeed.length > 0 && (
          <div className="mt-12 text-center text-gray-500 text-sm">
            End of companies • {companyFeed.length} items shown
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;