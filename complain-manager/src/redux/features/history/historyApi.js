import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";



export const historyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHistory: builder.query({
            query: () => `/manager/getHistory`,
            keepUnusedDataFor: 600,
            providesTags: ["History"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    //console.log(err);
                }
            },
        }),
      
     
      
     
    }),
})


export const {useGetHistoryQuery,   useDeleteHistoryMutation, } = historyApi;