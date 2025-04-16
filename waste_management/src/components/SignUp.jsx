import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice"; // Assuming you're using Redux for state management
import { BASE_URL } from "../utils/constants"; // Make sure this constant is set correctly

const SignUp = () => {
  const [signFormData, setSignFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    photoUrl: "",
    gender: "",
    age: "",
    about: "",
    skills: "",
    password: "",
    mobileNumber: "",
    address: "",
    pinCode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignFormData({
      ...signFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await axios.post(`${BASE_URL}/signup`, signFormData, {
        withCredentials: true,
      });
      const userData = {
        firstName: signFormData.firstName,
        photoUrl: signFormData.photoUrl,
        ...res.data, // preserve any other data from backend
      };
  
      dispatch(addUser(userData));
        return navigate("/"); // Redirect to the feed page after successful signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                name="firstName"
                value={signFormData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                name="lastName"
                value={signFormData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                name="emailId"
                value={signFormData.emailId}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                name="password"
                value={signFormData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Mobile Number</span>
              </div>
              <input
                type="tel"
                name="mobileNumber"
                value={signFormData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <input
                type="text"
                name="address"
                value={signFormData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Pin Code</span>
              </div>
              <input
                type="number"
                name="pinCode"
                value={signFormData.pinCode}
                onChange={handleChange}
                placeholder="Enter your pin code"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            {/* <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                name="gender"
                value={signFormData.gender}
                onChange={handleChange}
                placeholder="Enter your gender"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="number"
                name="age"
                value={signFormData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea
                name="about"
                value={signFormData.about}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="textarea textarea-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Skills</span>
              </div>
              <input
                type="text"
                name="skills"
                value={signFormData.skills}
                onChange={handleChange}
                placeholder="Enter your skills"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label> */}

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input
                type="text"
                name="photoUrl"
                value={signFormData.photoUrl}
                onChange={handleChange}
                placeholder="Enter your photo URL"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label> 

            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
