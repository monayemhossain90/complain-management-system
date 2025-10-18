import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";



export const complainApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPendingComplains: builder.query({
            query: () => `/employee/getAllSelfComplains`,
            keepUnusedDataFor: 600,
            providesTags: ["Complains"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //ErrorToast("Something Went Wrong!");
                    //do nothing
                    //console.log(err);
                }
            },
        }),
      
      
        updateComplain: builder.mutation({
            query: ({id, data}) => ({
                url: `/employee/updateComplainStatus/${id}`,
                method: "PATCH",
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


export const {useGetPendingComplainsQuery, useUpdateComplainMutation} = complainApi;