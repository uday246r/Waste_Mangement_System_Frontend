import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
 
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };
 
  useEffect(() => {
    fetchConnections();
  }, []);
 
  if (!connections) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gradient-to-r from-teal-100 to-green-100 h-16 w-16 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <p className="text-green-600 mt-4">Loading your connections...</p>
        </div>
      </div>
    );
  }
 
  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <svg className="w-16 h-16 text-teal-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-700">No Connections Found</h1>
          <p className="text-gray-600 mt-2">Start exploring to connect with people who share your interests.</p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-400">Your Connections</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-green-500 mx-auto mt-2"></div>
        <p className="italic text-white-300 mt-2">People you've connected with</p>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div key={_id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
              {/* Color Strip at Top */}
              <div className="h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
             
              <div className="p-5 flex items-center">
                {/* User Image */}
                <div className="flex-shrink-0">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={`${firstName}'s profile`}
                      className="w-16 h-16 object-cover rounded-full border-2 border-teal-100"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
               
                {/* User Info */}
                <div className="ml-4 flex-grow">
                  <h2 className="text-lg font-bold text-gray-800">{firstName} {lastName}</h2>
                 
                  {age && gender && (
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{age}, {gender}</span>
                    </div>
                  )}
                 
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {about || "No information provided."}
                  </p>
                </div>
               
                {/* Connection Badge */}
                <div className="flex-shrink-0 ml-2">
                  <div className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Connected
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;