import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";



export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/admin/getAllUsers`,
            keepUnusedDataFor: 600,
            providesTags: ["Users"],
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
       
        createUser: builder.mutation({
            query: (data) => ({
                url: "/admin/createUser",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Users"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    SuccessToast("Users List Create Success");
                }catch(err) {
                    //console.log(err)
                }
            }
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/deleteUser/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"],
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
        updateUser: builder.mutation({
            query: ({id, data}) => ({
                url: `/admin/updateUser/${id}`,
                method: "PATCH",
                body:data
            }),
            invalidatesTags: ["Users"],
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


export const {useGetUsersQuery,  useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation} = usersApi;