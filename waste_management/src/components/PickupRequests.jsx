import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addPickupRequest, updatePickupRequestStatus } from '../utils/pickupSlice';

const PickupRequests = () => {
    const pickupRequests = useSelector((store) => store.pickup.pickupRequests);
    const user = useSelector((store) => store.user || store.company);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const isCompany = user?.role === 'company';

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                BASE_URL + "/pickup/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(updatePickupRequestStatus({ requestId: _id, status }));
        } catch (err) {
            console.error("Failed to review request:", err);
        }
    };

    const markAsPickedUp = async (_id) => {
        try {
            await axios.post(
                BASE_URL + "/pickup/mark-picked-up/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(updatePickupRequestStatus({ requestId: _id, status: "picked-up" }));
        } catch (err) {
            console.error("Failed to mark request as picked up:", err);
        }
    };

    const fetchPickupRequests = async () => {
        setLoading(true);
        try {
            const endpoint = isCompany
                ? "/pickup/company/requests/pickup"
                : "/pickup/user/requests/pickup";

            const res = await axios.get(BASE_URL + endpoint, {
                withCredentials: true,
            });

            if (Array.isArray(res.data.data)) {
                dispatch(addPickupRequest(res.data.data));
            } else {
                console.warn("Unexpected data format:", res.data);
            }
        } catch (err) {
            console.error("Failed to fetch pickup requests:", err);
        } finally {
            setTimeout(() => setLoading(false), 800); // Slight delay for better UX
        }
    };

    useEffect(() => {
        fetchPickupRequests();
    }, [isCompany]);

    // Helper function to render status badge with appropriate styles
    const renderStatusBadge = (status) => {
        let bgColor, textColor, statusText;
        
        switch(status) {
            case "pending":
                bgColor = "bg-yellow-100";
                textColor = "text-yellow-800";
                statusText = "PENDING";
                break;
            case "accepted":
                bgColor = "bg-green-100";
                textColor = "text-green-800";
                statusText = "ACCEPTED";
                break;
            case "rejected":
                bgColor = "bg-red-100";
                textColor = "text-red-800";
                statusText = "REJECTED";
                break;
            case "picked-up":
                bgColor = "bg-blue-100";
                textColor = "text-blue-800";
                statusText = "PICKED UP";
                break;
            default:
                bgColor = "bg-gray-100";
                textColor = "text-gray-800";
                statusText = status.toUpperCase();
        }
        
        return (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                {statusText}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-teal-600 mx-auto"></div>
                    <p className="mt-4 text-teal-700 font-medium">Loading pickup requests...</p>
                </div>
            </div>
        );
    }

    if (!pickupRequests || pickupRequests.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
                    <svg className="w-16 h-16 text-teal-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <h1 className="text-2xl font-bold text-teal-800">No Pickup Requests Found</h1>
                    <p className="text-gray-600 mt-2">
                        {isCompany ? 
                            "No users have requested waste pickups yet." : 
                            "You haven't requested any waste pickups yet."}
                    </p>
                    {!isCompany && (
                        <button className="mt-6 px-5 py-3 bg-gradient-to-r from-teal-600 to-green-500 text-white rounded-lg transition-all duration-300 hover:shadow-md font-medium">
                            Request Pickup
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-50 py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-teal-600 to-green-500 rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="px-8 py-12 md:flex items-center justify-between">
                        <div className="md:w-2/3 mb-6 md:mb-0">
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Pickup Requests</h1>
                            <p className="mt-3 text-teal-50 text-lg">
                                {isCompany ? 
                                    "Review and manage waste collection requests from users." : 
                                    "Track the status of your waste collection requests."}
                            </p>
                        </div>
                        <div className="md:w-1/3 flex justify-end">
                            <button 
                                onClick={fetchPickupRequests}
                                className="bg-white text-teal-600 hover:bg-teal-50 shadow-md font-medium px-5 py-3 rounded-lg transition-all duration-300 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Requests
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {pickupRequests.map((request) => {
                        const { _id: requestId, status } = request;

                        if (isCompany) {
                            // COMPANY VIEW
                            const user = request.fromUserId || {};
                            const { firstName = '', lastName = '', photoUrl = '', age = '', gender = '', about = '', emailId = '' } = user;

                            if (!user._id) {
                                console.warn("Skipping malformed request:", request);
                                return null;
                            }

                            return (
                                <div key={requestId} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    {/* Color Strip at Top */}
                                    <div className="h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
                                    
                                    <div className="p-6">
                                        <div className="md:flex items-center">
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
                                            <div className="md:ml-6 flex-grow mt-4 md:mt-0">
                                                <h2 className="text-xl font-bold text-teal-800">{firstName} {lastName}</h2>
                                                
                                                {age && (
                                                    <div className="flex items-center text-gray-600 text-sm mb-1">
                                                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <span>{age} {gender && `- ${gender}`}</span>
                                                    </div>
                                                )}
                                                
                                                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                                    {about || "No information provided."}
                                                </p>
                                                
                                                {/* Status Badge */}
                                                <div className="mt-4 flex items-center">
                                                    {renderStatusBadge(status)}
                                                    
                                                    {/* Show user email when request is accepted */}
                                                    {status === "accepted" && (
                                                        <div className="ml-3 flex items-center">
                                                            <svg className="w-4 h-4 text-teal-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            <a href={`mailto:${emailId}`} className="text-sm text-teal-600 hover:underline">
                                                                {emailId}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Request Date */}
                                                <div className="flex items-center mt-2">
                                                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">
                                                        Request date: {new Date(request.createdAt || Date.now()).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="md:flex-shrink-0 md:ml-4 mt-4 md:mt-0 flex md:flex-col space-x-3 md:space-x-0 md:space-y-3">
                                                {status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => reviewRequest("accepted", requestId)}
                                                            className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-teal-600 to-green-500 text-white rounded-lg hover:shadow-md transition-all duration-300"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => reviewRequest("rejected", requestId)}
                                                            className="flex-1 md:flex-none px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                
                                                {/* Show contact button when request is accepted */}
                                                {status === "accepted" && (
                                                    <a 
                                                        href={`mailto:${emailId}?subject=Regarding your waste pickup request&body=Hello ${firstName},%0D%0A%0D%0AWe've accepted your waste pickup request and would like to coordinate the details.%0D%0A%0D%0ARegards,%0D%0AThe Team`}
                                                        className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-teal-600 to-green-500 text-white rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        Contact User
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Pickup Info Section - Only visible for picked-up requests */}
                                        {status === "picked-up" && (
                                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                                <div className="flex items-start">
                                                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-blue-800">Waste Pickup Completed</h3>
                                                        <p className="text-xs text-blue-600 mt-1">
                                                            The user has confirmed that the waste has been successfully picked up.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        } else {
                            // USER VIEW
                            const company = request.toCompanyId || {};
                            const { companyName = '', photoUrl = '', about = '', emailId = '' } = company;

                            if (!company._id) {
                                console.warn("Skipping malformed request:", request);
                                return null;
                            }

                            return (
                                <div key={requestId} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    {/* Color Strip at Top */}
                                    <div className="h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
                                    
                                    <div className="p-6">
                                        <div className="md:flex items-center">
                                            {/* Company Image */}
                                            <div className="flex-shrink-0">
                                                {photoUrl ? (
                                                    <img
                                                        src={photoUrl}
                                                        alt={`${companyName}`}
                                                        className="w-16 h-16 object-cover rounded-full border-2 border-teal-100"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-green-100 rounded-full flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Company Info */}
                                            <div className="md:ml-6 flex-grow mt-4 md:mt-0">
                                                <h2 className="text-xl font-bold text-teal-800">{companyName}</h2>
                                                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                                    {about || "No information provided."}
                                                </p>
                                                
                                                {/* Request Details */}
                                                <div className="flex items-center mt-4">
                                                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">
                                                        Request date: {new Date(request.createdAt || Date.now()).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                
                                                {/* Status Badge */}
                                                <div className="mt-2">
                                                    {renderStatusBadge(status)}
                                                </div>
                                                
                                                {/* Company Email - Only shown when accepted */}
                                                {status === "accepted" && (
                                                    <div className="mt-2 flex items-center">
                                                        <svg className="w-4 h-4 text-teal-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <a href={`mailto:${emailId}`} className="text-sm text-teal-600 hover:underline">
                                                            {emailId}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Action Buttons for User */}
                                            <div className="md:flex-shrink-0 md:ml-4 mt-4 md:mt-0">
                                                {status === "accepted" && (
                                                    <div className="flex flex-col space-y-3">
                                                        {/* Contact Company Button */}
                                                        <a 
                                                            href={`mailto:${emailId}?subject=Regarding my waste pickup request&body=Hello ${companyName},%0D%0A%0D%0AI would like to discuss details about my waste pickup request.%0D%0A%0D%0ARegards`}
                                                            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-green-500 text-white rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            Contact Company
                                                        </a>
                                                        
                                                        {/* Mark as Picked Up Button */}
                                                        <button 
                                                            onClick={() => markAsPickedUp(requestId)}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300 flex items-center justify-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Mark as Picked Up
                                                        </button>
                                                    </div>
                                                )}
                                                
                                                {status === "picked-up" && (
                                                    <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                                                        <svg className="w-6 h-6 text-blue-500 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className="text-sm font-medium text-blue-800">Pickup Complete</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Thank You Message - Only visible for picked-up requests */}
                                        {status === "picked-up" && (
                                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                                <div className="flex items-start">
                                                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-blue-800">Thank You for Using Our Service!</h3>
                                                        <p className="text-xs text-blue-600 mt-1">
                                                            Your waste has been successfully picked up. Thank you for contributing to a cleaner environment.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                
                <div className="mt-12 text-center text-gray-500 text-sm">
                    End of requests • {pickupRequests.length} {pickupRequests.length === 1 ? 'request' : 'requests'} shown
                </div>
            </div>
        </div>
    );
};

export default PickupRequests;