import React from 'react'
import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post(
              BASE_URL + "/login",
              {
                emailId,
                password,
              }, 
              {withCredentials: true}
            );
            dispatch(addUser(res.data));
            return navigate("/");
        } catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleSignUp = async () => {
        try{
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true}
            );
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl w-full max-w-md">
                {/* Color Strip at Top */}
                <div className="h-2 bg-gradient-to-r from-teal-500 to-green-500"></div>
                
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        {isLoginForm ? "Welcome Back" : "Join Our Community"}
                    </h2>
                    
                    <form className="space-y-5">
                        {!isLoginForm && (
                            <>
                                <div>
                                    <label className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-green-800 placeholder-gray-400">
                                        First Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-green-800 placeholder-gray-400">
                                        Last Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </>
                        )}
                        
                        <div>
                            <label className="block text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input 
                                type="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-green-800 placeholder-gray-400"
                            />
                        </div>
                        
                        {error && (
                            <div className="text-red-500 text-sm py-1">{error}</div>
                        )}
                        
                        <button 
                            type="button"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 py-3 font-medium"
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p 
                            className="text-gray-600 hover:text-teal-600 cursor-pointer transition duration-300"
                            onClick={() => setIsLoginForm((value) => !value)}
                        >
                            {isLoginForm 
                                ? "New user? Create an account" 
                                : "Already have an account? Login here"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;