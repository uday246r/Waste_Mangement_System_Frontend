import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id))
        }
        catch (err) {
            console.error("Failed to review request:", err);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            dispatch(addRequest(res.data.data));
        }
        catch (err) {
            console.error("Failed to fetch requests:", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return null;
   
    if (requests.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <svg className="w-16 h-16 text-teal-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-700">No Requests Found</h1>
                    <p className="text-gray-600 mt-2">You don't have any connection requests at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-green-400">Connection Requests</h1>
                <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-green-500 mx-auto mt-2"></div>
                <p className="italic text-white-300  mt-2">Review and respond to people who want to connect with you</p>
            </div>

            <div className="space-y-6">
                {requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                    return (
                        <div key={_id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
                            {/* Color Strip at Top */}
                            <div className="h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
                           
                            <div className="p-4 md:p-6 flex flex-col md:flex-row items-center">
                                {/* User Image */}
                                <div className="flex-shrink-0 mb-4 md:mb-0">
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt={`${firstName}'s profile`}
                                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-2 border-teal-100"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-teal-100 to-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                               
                                {/* User Info */}
                                <div className="flex-grow md:ml-6 text-center md:text-left">
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">{firstName} {lastName}</h2>
                                   
                                    {age && gender && (
                                        <div className="flex items-center justify-center md:justify-start text-gray-600 mb-2">
                                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>{age}, {gender}</span>
                                        </div>
                                    )}
                                   
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {about || "No information provided."}
                                    </p>
                                </div>
                               
                                {/* Action Buttons */}
                                <div className="flex-shrink-0 flex space-x-3 mt-4 md:mt-0">
                                    <button
                                        onClick={() => reviewRequest("rejected", request._id)}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => reviewRequest("accepted", request._id)}
                                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Requests;