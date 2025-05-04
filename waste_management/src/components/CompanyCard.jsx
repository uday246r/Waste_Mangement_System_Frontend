import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFromFeed } from '../utils/feedSlice';
import { addPickupRequest } from '../utils/pickupSlice';  // Import the action for adding requests

const CompanyCard = ({ company }) => {
  const {
    _id,
    companyName,
    photoUrl,
    price,
    wasteType,
    pickupTimeFrom,
    pickupTimeTo,
    location,
    about,
    email,
  } = company;

  const [isHovered, setIsHovered] = useState(false);
  const [buttonState, setButtonState] = useState('idle'); // idle | sending | sent | error
  const dispatch = useDispatch();

  const handleSendRequest = async () => {
    try {
      setButtonState('sending');
      await axios.post(`${BASE_URL}/pickup/send/pending/${_id}`, {}, { withCredentials: true });
      setButtonState('sent');
      dispatch(removeFromFeed(_id));
      
      // Dispatch the new request with 'pending' status to the Redux store
      dispatch(addPickupRequest({ companyId: _id, status: 'pending' }));
    } catch (err) {
      console.error('Failed to send request:', err);
      setButtonState('error');
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 ease-in-out max-w-md mx-auto border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between p-4 items-center">
        <div className="flex items-center space-x-4">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={companyName}
              className="w-16 h-16 object-cover rounded-full border-2 border-teal-100"
            />
          ) : (
            <div className="w-16 h-16 bg-teal-100 rounded-full flex justify-center items-center">
              <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7a5 5 0 11-10 0 5 5 0 0110 0zM12 17a7 7 0 00-7-7h14a7 7 0 00-7 7z" />
              </svg>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{companyName}</h2>
            <p className="text-sm text-gray-600">{wasteType}</p>
          </div>
        </div>

        <div className="text-right space-y-2">
          <div className="text-sm text-gray-600">{location}</div>
          <div className="text-sm text-gray-600">
  {company.pickupTimeFrom && company.pickupTimeTo
    ? `${company.pickupTimeFrom} - ${company.pickupTimeTo}`
    : 'No pickup time available'}
</div>
          <div className="font-semibold text-teal-600">${price}/pickup</div>
        </div>
      </div>

      <div className="p-4 text-gray-600">
        <p className="text-sm">{about}</p>
      </div>

      <div className="p-4">
        <button
          className={`w-full py-3 text-white rounded-lg transition-all duration-300 ${buttonState === 'sending' ? 'bg-gray-400' : buttonState === 'sent' ? 'bg-teal-600' : 'bg-teal-500'} ${buttonState === 'error' ? 'bg-red-600' : ''}`}
          disabled={buttonState === 'sending'}
          onClick={handleSendRequest}
        >
          {buttonState === 'sending' ? 'Sending...' : buttonState === 'sent' ? 'Request Sent' : 'Send Pickup Request'}
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
