import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";



export const employeesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => `/manager/getAllEmployees`,
            keepUnusedDataFor: 600,
            providesTags: ["Employees"],
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
       
     
    }),
})


export const {useGetEmployeesQuery} = employeesApi;