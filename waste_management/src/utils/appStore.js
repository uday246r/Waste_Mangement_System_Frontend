import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  companyReducer  from "./companySlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import pickupReducer from './pickupSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        company: companyReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer,
        pickup: pickupReducer,
    },
});

export default appStore;