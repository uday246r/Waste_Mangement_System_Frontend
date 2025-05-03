import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFromFeed } from '../utils/feedSlice';

const CompanyCard = ({ company }) => {
  const {
    _id,
    companyName,
    photoUrl,
    price,
    wasteType,
    location,
    about,
    email,
  } = company;

  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, companyId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${companyId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFromFeed(companyId));
    } catch (err) {
      console.log('Failed to send request:', err);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-xl max-w-md mx-auto border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '',
      }}
    >
      {/* Top Strip */}
      <div className="h-1.5 bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400" />

      {/* Image Section */}
      <div className="relative">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${companyName}'s profile`}
            className="w-full h-64 object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-teal-400 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
        <span className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center">
          <svg 
            className="w-3 h-3 mr-1 text-white" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
          Eco Verified
        </span>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          {companyName}
          {wasteType && (
            <span className="ml-2 text-xs font-medium text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
              {wasteType}
            </span>
          )}
        </h2>

        {/* Price and Location */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {price && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-gray-700">${price} per KG</span>
            </div>
          )}
          {location && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium text-gray-700">{location}</span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <h3 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {about || 'No information provided.'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => handleSendRequest('ignored', _id)}
            className="w-1/2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest('interested', _id)}
            className="w-1/2 py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg flex items-center justify-center transition-colors duration-200 shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;