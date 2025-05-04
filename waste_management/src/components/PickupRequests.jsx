import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addPickupRequest, updatePickupRequestStatus } from '../utils/pickupSlice';

const PickupRequests = () => {
    const pickupRequests = useSelector((store) => store.pickup.pickupRequests);
    const user = useSelector((store) => store.user || store.company);
    const dispatch = useDispatch();

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

    const fetchPickupRequests = async () => {
        try {
            const endpoint = isCompany
                ? "/pickup/company/requests/pickup"
                : "/pickup/user/requests/pickup"; // ensure correct endpoint

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
        }
    };

    useEffect(() => {
        fetchPickupRequests();
    }, [isCompany]);

    if (!pickupRequests) return null;

    if (pickupRequests.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-700">No Pickup Requests Found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-green-400 text-center mb-6">Pickup Requests</h1>

            <div className="space-y-6">
                {pickupRequests.map((request) => {
                    const { _id: requestId, status } = request;

                    if (isCompany) {
                        const user = request.fromUserId || {};
                        const { firstName = '', lastName = '', photoUrl = '', age = '', gender = '', about = '' } = user;

                        if (!user._id) {
                            console.warn("Skipping malformed request:", request);
                            return null;
                        }

                        return (
                            <div key={requestId} className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
                                        {photoUrl ? (
                                            <img src={photoUrl} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-green-500 text-xl font-semibold">{firstName} {lastName}</h2>
                                        <p className="text-gray-600">{age} {gender && `- ${gender}`}</p>
                                        <p className="text-gray-500">{about || "No info available."}</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => reviewRequest("rejected", requestId)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => reviewRequest("accepted", requestId)}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        // FOR USER SIDE
                        const company = request.toCompanyId || {};
                        const { companyName = '', photoUrl = '', about = '' } = company;

                        if (!company._id) {
                            console.warn("Skipping malformed request:", request);
                            return null;
                        }

                        return (
                            <div key={requestId} className="bg-white rounded-lg shadow-lg p-6 flex items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
                                    {photoUrl ? (
                                        <img src={photoUrl} alt="Company" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-blue-500 text-xl font-semibold">{companyName}</h2>
                                    <p className="text-gray-500">{about || "No info available."}</p>
                                </div>

                                <div>
                                    <span className={`text-white px-4 py-2 rounded ${status === "pending"
                                        ? "bg-yellow-500"
                                        : status === "accepted"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        }`}>
                                        {status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default PickupRequests;
