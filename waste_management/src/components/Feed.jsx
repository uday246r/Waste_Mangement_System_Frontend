import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../utils/constants";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from "../utils/feedSlice";
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeed = async() => {
    if(feed) {
      setLoading(false);
      return;
    }
    
    try {    
      setLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res?.data?.data));
      setLoading(false);
    } catch(err) {
      setError("Failed to load feed data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-teal-700 font-medium">Loading feed data...</p>
        </div>
      </div>
    );
  }

  if(error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={getFeed}
            className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if(!feed) return null;

  if(feed.length <= 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-amber-500 max-w-md">
          <h1 className="text-xl font-semibold text-amber-600">No Users Found</h1>
          <p className="mt-2 text-gray-600">There are currently no new users in the system.</p>
          <div className="mt-4 flex justify-center">
            <button 
              onClick={getFeed}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-300 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
          Waste Management Support Feed
        </h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-100">
          <div className="p-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
          <div className="p-6">
            {feed && feed.map((user, index) => (
              <div key={user.id || index} className={`${index > 0 ? 'mt-6 pt-6 border-t border-gray-100' : ''}`}>
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;