import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async() => {
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit", 
                {
                    firstName, 
                    lastName, 
                    photoUrl, 
                    age, 
                    gender, 
                    about,
                },
                {withCredentials: true}
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        catch(err) {
            setError(err?.response?.data);
        }
    };

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-green-400">Edit Your Profile</h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-green-500 mx-auto mt-2"></div>
                    <p className="italic text-white-300 mt-2">Update your information and see how your profile appears to others</p>
                </div>

                <div className="flex flex-col lg:flex-row justify-center gap-8">
                    {/* Edit Form */}
                    <div className="w-full lg:w-1/2 max-w-md mx-auto my-13">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
                            {/* Color Strip at Top */}
                            <div className="h-2 bg-gradient-to-r from-teal-500 to-green-500"></div>
                            
                            <div className="p-6">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-green-700 uppercase tracking-wider mb-2">
                                                First Name
                                            </label>
                                            <input 
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500 placeholder-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                                Last Name
                                            </label>
                                            <input 
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                                Age
                                            </label>
                                            <input 
                                                type="number"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500 placeholder-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                                Gender
                                            </label>
                                            <input 
                                                type="text"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                            Photo URL
                                        </label>
                                        <input 
                                            type="text"
                                            value={photoUrl}
                                            onChange={(e) => setPhotoUrl(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500 placeholder-gray-400"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                            About
                                        </label>
                                        <textarea 
                                            value={about}
                                            onChange={(e) => setAbout(e.target.value)}
                                            rows="3"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500 placeholder-gray-400"
                                        />
                                    </div>
                                    
                                    {error && (
                                        <div className="text-red-500 text-sm py-1">{error}</div>
                                    )}
                                    
                                    <button 
                                        type="button"
                                        onClick={saveProfile}
                                        className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 py-3 font-medium flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    {/* Preview Card */}
                    <div className="w-full lg:w-1/2 max-w-md mx-auto mt-8 lg:mt-0">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-medium text-green-400">Profile Preview</h3>
                        </div>
                        <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} />
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed top-4 inset-x-0 flex justify-center items-start z-50">
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center transition-all duration-500 transform translate-y-0 opacity-100">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Profile saved successfully!</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;