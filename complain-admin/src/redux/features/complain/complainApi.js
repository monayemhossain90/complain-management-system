import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";



export const complainApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComplains: builder.query({
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
        updateComplain: builder.mutation({
            query: ({id, data}) => ({
                url: `/admin/updateComplain/${id}`,
                method: "PATCH",
                body:data
            }),
            invalidatesTags: ["Complains" ],
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


export const {useGetComplainsQuery,  useDeleteComplainMutation, useUpdateComplainMutation} = complainApi;