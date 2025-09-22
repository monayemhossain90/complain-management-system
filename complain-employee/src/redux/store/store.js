import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice.js";
import authSliceReducer from "../features/auth/authSlice.js";
import modalSliceReducer from "../features/modal/modalSlice.js";

import complainSliceReducer from "../features/complain/complainSlice.js";




const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authSliceReducer,
        modal: modalSliceReducer,
        complain: complainSliceReducer,
        
      
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
})


export default store;