import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";



export const historyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHistory: builder.query({
            query: () => `/admin/getHistory`,
            keepUnusedDataFor: 600,
            providesTags: ["History"],
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
      
     
        deleteHistory: builder.mutation({
            query: (id) => ({
                url: `/admin/deleteHistory/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["History"],
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


export const {useGetHistoryQuery,   useDeleteHistoryMutation, } = historyApi;