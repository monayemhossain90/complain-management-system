import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getToken} from "../../../helper/SessionHelper.js";

const baseQuery = fetchBaseQuery({
    
    //    baseUrl: "http://localhost:5000/api",
         baseUrl: "https://complain-management-system-mu.vercel.app/api",
     
    prepareHeaders: async (headers) =>{
        if(getToken()){
            headers.set("token", getToken());
        }
        return headers;
    }
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
            localStorage.clear();
            // ErrorToast("Token Expired");
            window.location.href="/";
        }
        return result;
    },
    tagTypes: ["Users", "Complains","history"], //TagS WhiteLists
    endpoints: () => ({}),
})



