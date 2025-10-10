import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";



export const complainApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get pending complains
        getPendingComplains: builder.query({
            query: () => `/admin/getAllPendingComplains`,
            keepUnusedDataFor: 600,
            providesTags: ["Complains"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //ErrorToast("Something Went Wrong!");
                    //do nothing
                    //console.log(err);
                }
            },
        }),

        // get completed complains
       getCompletedComplains: builder.query({
            query: () => `/admin/getAllCompletedComplains`,
            keepUnusedDataFor: 600,
            providesTags: ["com"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //ErrorToast("Something Went Wrong!");
                  
                    //console.log(err);
                }
            },
        }),
       
            // get done complains
       getDoneComplains: builder.query({
            query: () => `/admin/getAllDoneComplains`,
            keepUnusedDataFor: 600,
            providesTags: ["com"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
                  
                    //console.log(err);
                }
            },
        }),

        // delete complain by admin
        deleteComplain: builder.mutation({
            query: (id) => ({
                url: `/admin/deleteComplain/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Complains"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast(" Success");
                    }
                }catch(err) {
                    //console.log(err);
                }
            }
        }),
       
    }),
})


export const {useGetPendingComplainsQuery, useGetCompletedComplainsQuery, useGetDoneComplainsQuery, useDeleteComplainMutation} = complainApi;