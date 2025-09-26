import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";



export const complainApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPendingComplains: builder.query({
            query: () => `/manager/getAllPendingComplains`,
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
       getCompletedComplains: builder.query({
            query: () => `/manager/getAllCompletedComplains`,
            keepUnusedDataFor: 600,
            providesTags: ["complain"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //ErrorToast("Something Went Wrong!");
                  
                    //console.log(err);
                }
            },
        }),
       
          createComplain: builder.mutation({
            query: (data) => ({
                url: "/manager/createComplain",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Complains", ],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    SuccessToast("Complain Create Success");
                }catch(err) {
                    //console.log(err)
                }
            }
        }),
      
        updateComplain: builder.mutation({
            query: ({id, data}) => ({
                url: `/manager/updateComplain/${id}`,
                method: "P",
                body:data
            }),
            invalidatesTags: ["Complains", ],
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


export const {useGetPendingComplainsQuery, useCreateComplainMutation,useGetCompletedComplainsQuery,useUpdateComplainMutation} = complainApi;