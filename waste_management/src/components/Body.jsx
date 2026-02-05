import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useNavigate, Outlet } from "react-router-dom";
import Footer from './Footer';
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { addCompany } from "../utils/companySlice";
import Chat from './chat';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const companyData = useSelector((store) => store.company);

  useEffect(() => {
    const fetchUserOrCompany = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (userErr) {
        try {
          const res = await axios.get(BASE_URL + "/companyProfile/view", {
            withCredentials: true,
          });
          dispatch(addCompany(res.data));
        } catch (companyErr) {
          console.error("Not logged in as user or company");
          navigate("/gate", { replace: true });
        }
      }
    };

    if (!userData?._id && !companyData?._id) {
      fetchUserOrCompany();
    }
  }, [dispatch, navigate, userData, companyData]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />

       <div className="fixed bottom-4 right-4 z-50">
        <Chat />
      </div>

    </div>
  );
};

export default Body;
